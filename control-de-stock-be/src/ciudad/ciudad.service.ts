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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
<<<<<<< Updated upstream
    const provincia = await this.provinciaRepository.findOneBy({ idProvincia: createCiudadDto.idProvincia });
    if (!provincia) {
      throw new BadRequestException(`La provincia con ID '${createCiudadDto.idProvincia}' no existe.`);
    }

    const ciudadExistente = await this.ciudadRepository.findOneBy({ nombre: createCiudadDto.nombre, provincia: { idProvincia: createCiudadDto.idProvincia } });
    if (ciudadExistente) {
      throw new BadRequestException(`La ciudad '${createCiudadDto.nombre}' ya existe en la provincia '${provincia.nombre}'.`);
=======
    const { idProvincia } = createCiudadDto;

    const provincia = await this.provinciaRepository.findOneBy({ idProvincia });
    if (!provincia) {
      throw new NotFoundException(`Provincia con ID '${idProvincia}' no encontrada.`);
>>>>>>> Stashed changes
    }

    const nuevaCiudad = this.ciudadRepository.create({
      ...createCiudadDto,
<<<<<<< Updated upstream
      provincia: provincia,
=======
      provincia,
>>>>>>> Stashed changes
    });

    return this.ciudadRepository.save(nuevaCiudad);
  }

  async findAll(): Promise<Ciudad[]> {
<<<<<<< Updated upstream
    return this.ciudadRepository.find({ relations: ['provincia'] });
=======
    return this.ciudadRepository.find({
      relations: ['provincia'],
    });
>>>>>>> Stashed changes
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

  async update(id: number, updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
<<<<<<< Updated upstream
    const ciudad = await this.ciudadRepository.findOne({
      where: { idCiudad: id },
      relations: ['provincia'],
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID '${id}' no encontrada.`);
    }

    if (updateCiudadDto.nombre) {
      const ciudadExistente = await this.ciudadRepository.findOneBy({
        nombre: updateCiudadDto.nombre,
        provincia: { idProvincia: ciudad.provincia.idProvincia },
      });
      if (ciudadExistente && ciudadExistente.idCiudad !== id) {
        throw new BadRequestException(`La ciudad '${updateCiudadDto.nombre}' ya existe en la provincia '${ciudad.provincia.nombre}'.`);
      }
    }

    const ciudadActualizada = this.ciudadRepository.merge(ciudad, updateCiudadDto);

=======
    const ciudad = await this.findOne(id);

    if (updateCiudadDto.idProvincia) {
      const provincia = await this.provinciaRepository.findOneBy({ idProvincia: updateCiudadDto.idProvincia });
      if (!provincia) {
        throw new NotFoundException(`Provincia con ID '${updateCiudadDto.idProvincia}' no encontrada.`);
      }
      ciudad.provincia = provincia;
    }

    const ciudadActualizada = this.ciudadRepository.merge(ciudad, updateCiudadDto);
>>>>>>> Stashed changes
    return this.ciudadRepository.save(ciudadActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ciudadRepository.delete(id);
<<<<<<< Updated upstream
    if (result.affected === 0) {
      throw new NotFoundException(`Ciudad con ID '${id}' no encontrada.`);
    }
=======

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
>>>>>>> Stashed changes
  }
}
