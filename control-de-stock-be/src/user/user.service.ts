// src/usuario/usuario.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Not, FindManyOptions } from 'typeorm';
import { Usuario, UsuarioRole } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdatePatchUsuarioDto } from '../dto/update-patch-usuario.dto';
import { UpdatePutUsuarioDto } from '../dto/update-put-usuario.dto';
import { City } from '../entities/city.entity';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import {
  UsuarioResponseDto,
  CityResponse,
  ProvinceResponse,
  CountryResponse,
} from '../interfaces/usuario.interfaces';

function adjustDateForTimezone(dateString: string | Date): Date | null {
  if (!dateString) return null;
  // Si ya es un objeto Date, no hacemos nada. Si es string, lo ajustamos.
  if (typeof dateString !== 'string') return dateString;
  // Creamos la fecha, que JS interpretará como UTC a medianoche.
  const date = new Date(dateString);
  // Obtenemos el desfase de la zona horaria del servidor en minutos (ej: para GMT-3 es 180).
  const timezoneOffset = date.getTimezoneOffset();
  // Añadimos ese desfase a la fecha para contrarrestar la conversión UTC y mantener el día correcto.
  return new Date(date.getTime() + timezoneOffset * 60000);
}

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  private readonly defaultRelations = [
    'city',
    'city.province',
    'city.province.country',
  ];

  private mapToResponseDto(usuario: Usuario): UsuarioResponseDto | null {
    if (!usuario) {
      return null;
    }

    let cityResponse: CityResponse | null = null;
    if (usuario.city) {
      let provinceResponse: ProvinceResponse | null = null;
      if (usuario.city.province) {
        let countryResponse: CountryResponse | null = null;
        if (usuario.city.province.country) {
          countryResponse = {
            id: usuario.city.province.country.id,
            name: usuario.city.province.country.name,
          };
        }
        provinceResponse = {
          id: usuario.city.province.id,
          name: usuario.city.province.name,
          country: countryResponse,
        };
      }
      cityResponse = {
        id: usuario.city.id,
        name: usuario.city.name,
        province: provinceResponse,
      };
    }

    return {
      id: usuario.id,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      email: usuario.email,
      birthDate: usuario.birthDate,
      role: usuario.role,
      city: cityResponse,
      cityId: usuario.cityId,
    };
  }

  async create(
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.debug(`Creando usuarioa: ${createUsuarioDto.email}`);
    const { email, password, cityId, role, birthDate, firstName, lastName } =
      createUsuarioDto;

    const existingUsuario = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (existingUsuario) {
      this.logger.warn(`Email '${email}' ya existe.`);
      throw new ConflictException(`El email '${email}' ya está en uso.`);
    }

    let cityEntity: City | null = null;
    if (cityId !== undefined && cityId !== null) {
      cityEntity = await this.cityRepository.findOne({ where: { id: cityId } });
      if (!cityEntity) {
        this.logger.warn(`Ciudad con ID ${cityId} no encontrada.`);
        throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada.`);
      }
    }

    const newUsuarioEntity = this.usuarioRepository.create({
      firstName,
      lastName,
      email,
      password,
      role: role || UsuarioRole.USER,
      city: cityEntity,
      cityId: cityEntity ? cityEntity.id : null,
      birthDate: birthDate ? adjustDateForTimezone(birthDate) : null,
    });

    const savedUsuario = await this.usuarioRepository.save(newUsuarioEntity);
    this.logger.log(`Usuarioa creada con ID: ${savedUsuario.id}`);
    const reloadedUsuario = await this.usuarioRepository.findOne({
      where: { id: savedUsuario.id },
      relations: this.defaultRelations,
    });

    if (!reloadedUsuario) {
      this.logger.error(
        `Error crítico: No se pudo recargar la usuarioa creada con ID ${savedUsuario.id}`,
      );
      throw new InternalServerErrorException(
        'No se pudo recargar la usuarioa creada.',
      );
    }
    const responseDto = this.mapToResponseDto(reloadedUsuario);
    if (!responseDto) {
      this.logger.error(
        `Error crítico: el mapeo de la usuarioa con ID ${savedUsuario.id} resultó en null.`,
      );
      throw new InternalServerErrorException(
        'Ocurrió un error al procesar la respuesta.',
      );
    }
    return responseDto;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<UsuarioResponseDto>> {
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationDto;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Usuario> = {
      relations: this.defaultRelations,
      skip: skip,
      take: limit,
      order: sortBy ? { [sortBy]: sortOrder || 'ASC' } : { id: 'ASC' },
    };

    const [usuarios, total] =
      await this.usuarioRepository.findAndCount(findOptions);

    const mappedUsuarios = usuarios
      .map((usuario) => this.mapToResponseDto(usuario))
      .filter((p): p is UsuarioResponseDto => p !== null);

    return new PaginatedResponseDto<UsuarioResponseDto>(
      mappedUsuarios,
      total,
      page,
      limit,
    );
  }

  async findOne(
    id: number,
    loadRelations: boolean = true,
  ): Promise<UsuarioResponseDto> {
    this.logger.debug(`Buscando usuarioa ID: ${id}`);
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: loadRelations ? this.defaultRelations : [],
    });
    if (!usuario) {
      this.logger.warn(`Usuarioa ID ${id} no encontrada.`);
      throw new NotFoundException(`Usuarioa con ID ${id} no encontrada.`);
    }

    const responseDto = this.mapToResponseDto(usuario);
    if (!responseDto) {
      this.logger.error(
        `Error crítico: el mapeo de la usuarioa con ID ${id} resultó en null.`,
      );
      throw new InternalServerErrorException(
        'Ocurrió un error al procesar la respuesta.',
      );
    }
    return responseDto;
  }

  async findByEmailForAuth(email: string): Promise<Usuario | null> {
    this.logger.debug(`Buscando usuarioa por email para auth: ${email}`);
    return this.usuarioRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'role',
        'firstName',
        'lastName',
        'cityId',
        'birthDate',
      ],
    });
  }

  async update(
    id: number,
    updateDto: UpdatePatchUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.debug(`Actualizando (PATCH) usuarioa ID: ${id}`);
    const usuarioToUpdate = await this.usuarioRepository.preload({
      id: id,
      ...updateDto,
    });
    if (!usuarioToUpdate) {
      throw new NotFoundException(`Usuarioa con ID ${id} no encontrada.`);
    }

    Object.assign(usuarioToUpdate, updateDto);
    const updatedUsuario = await this.usuarioRepository.save(usuarioToUpdate);
    const reloadedUsuario = await this.usuarioRepository.findOne({
      where: { id: updatedUsuario.id },
      relations: this.defaultRelations,
    });

    if (!reloadedUsuario) {
      throw new InternalServerErrorException(
        'No se pudo recargar la usuarioa actualizada.',
      );
    }
    const responseDto = this.mapToResponseDto(reloadedUsuario);
    if (!responseDto) {
      throw new InternalServerErrorException(
        'Ocurrió un error al procesar la respuesta de actualización.',
      );
    }
    return responseDto;
  }

  async updatePut(
    id: number,
    updateDto: UpdatePutUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.debug(`Actualizando (PUT) usuarioa ID: ${id}`);
    let usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuarioa con ID ${id} no encontrada.`);
    }

    Object.assign(usuario, updateDto);
    const updatedUsuario = await this.usuarioRepository.save(usuario);
    const reloadedUsuario = await this.usuarioRepository.findOne({
      where: { id: updatedUsuario.id },
      relations: this.defaultRelations,
    });

    if (!reloadedUsuario) {
      throw new InternalServerErrorException(
        'No se pudo recargar la usuarioa actualizada.',
      );
    }
    const responseDto = this.mapToResponseDto(reloadedUsuario);
    if (!responseDto) {
      throw new InternalServerErrorException(
        'Ocurrió un error al procesar la respuesta de actualización.',
      );
    }
    return responseDto;
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.debug(`Eliminando usuarioa ID: ${id}`);
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Usuarioa ID ${id} no encontrada para eliminar.`);
      throw new NotFoundException(`Usuarioa con ID ${id} no encontrada.`);
    }
    this.logger.log(`Usuarioa ID: ${id} eliminada.`);
    return { message: `Usuarioa con ID ${id} eliminada correctamente.` };
  }

  async findByName(
    nameQuery: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<UsuarioResponseDto>> {
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationDto;
    const findOptions: FindManyOptions<Usuario> = {
      where: [
        { firstName: ILike(`%${nameQuery}%`) },
        { lastName: ILike(`%${nameQuery}%`) },
      ],
      relations: this.defaultRelations,
      skip: (page - 1) * limit,
      take: limit,
      order: sortBy ? { [sortBy]: sortOrder || 'ASC' } : { id: 'ASC' },
    };

    const [usuarios, total] =
      await this.usuarioRepository.findAndCount(findOptions);

    const mappedUsuarios = usuarios
      .map((usuario) => this.mapToResponseDto(usuario))
      .filter((p): p is UsuarioResponseDto => p !== null);

    return new PaginatedResponseDto<UsuarioResponseDto>(
      mappedUsuarios,
      total,
      page,
      limit,
    );
  }
}
