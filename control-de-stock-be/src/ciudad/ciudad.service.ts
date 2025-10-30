import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from '../entities/ciudad.entity';
import { Provincia } from '../entities/provincia.entity';
import { CreateCiudadDto } from '../dto/create-ciudad.dto';
import { UpdateCiudadDto } from '../dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,

    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) { }

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const { idProvincia } = createCiudadDto;

    const provincia = await this.provinciaRepository.findOneBy({ idProvincia });
    if (!provincia) {
      throw new NotFoundException(`Provincia con ID '${idProvincia}' no encontrada.`);
    }

    const nuevaCiudad = this.ciudadRepository.create({
      ...createCiudadDto,
      provincia,
    });

    return this.ciudadRepository.save(nuevaCiudad);
  }

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find({
      relations: ['provincia'],
    });
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { idCiudad: id },
      relations: ['provincia'],
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID '${id}' no encontrada.`);
    }
    return ciudad;
  }

  async findOneByNameAndProvinceId(
    name: string,
    provinceId: number,
    throwError: boolean = true,
    returnNull: boolean = false
  ): Promise<Ciudad | null> {
    const nombreLower = name.toLowerCase();
    const ciudad = await this.ciudadRepository
      .createQueryBuilder('ciudad')
      .where('LOWER(ciudad.nombre) = :nombre', { nombre: nombreLower })
      .andWhere('ciudad.provinciaId = :provinciaId', { provinciaId: provinceId })
      .getOne();
    if (!ciudad && throwError) {
      throw new NotFoundException(`Ciudad con nombre '${name}' no encontrada en la provincia ${provinceId}.`);
    }
    if (!ciudad && returnNull) {
      return null;
    }
    return ciudad || null;
  }

  async findByProvinciaId(idProvincia: number): Promise<Ciudad[]> {
    const ciudades = await this.ciudadRepository.find({
      where: { idProvincia: idProvincia },
      order: { nombre: 'ASC' },
    });

    return ciudades || [];
  }

  async update(id: number, updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.findOne(id);

    if (updateCiudadDto.idProvincia) {
      const provincia = await this.provinciaRepository.findOneBy({ idProvincia: updateCiudadDto.idProvincia });
      if (!provincia) {
        throw new NotFoundException(`Provincia con ID '${updateCiudadDto.idProvincia}' no encontrada.`);
      }
      ciudad.provincia = provincia;
    }

    const ciudadActualizada = this.ciudadRepository.merge(ciudad, updateCiudadDto);
    return this.ciudadRepository.save(ciudadActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ciudadRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Ciudad con ID '${id}' no encontrada.`);
    }
  }

  async findOneByNameAndProvinceName(cityName: string, provinceName?: string): Promise<Ciudad | null> {
    const query = this.ciudadRepository.createQueryBuilder('ciudad')
      .leftJoinAndSelect('ciudad.provincia', 'provincia')
      .where('ciudad.nombre = :cityName', { cityName });

    if (provinceName) {
      query.andWhere('provincia.nombre = :provinceName', { provinceName });
    }

    return query.getOne();
  }
}
