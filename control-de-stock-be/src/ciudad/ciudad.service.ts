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
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const provincia = await this.provinciaRepository.findOneBy({ idProvincia: createCiudadDto.idProvincia });
    if (!provincia) {
      throw new BadRequestException(`La provincia con ID '${createCiudadDto.idProvincia}' no existe.`);
    }

    const ciudadExistente = await this.ciudadRepository.findOneBy({ nombre: createCiudadDto.nombre, provincia: { idProvincia: createCiudadDto.idProvincia } });
    if (ciudadExistente) {
      throw new BadRequestException(`La ciudad '${createCiudadDto.nombre}' ya existe en la provincia '${provincia.nombre}'.`);
    }

    const nuevaCiudad = this.ciudadRepository.create({
      ...createCiudadDto,
      provincia: provincia,
    });

    return this.ciudadRepository.save(nuevaCiudad);
  }

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find({ relations: ['provincia'] });
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

    return this.ciudadRepository.save(ciudadActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ciudadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ciudad con ID '${id}' no encontrada.`);
    }
  }
}
