import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from '../entities/marca.entity';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const nombre = createMarcaDto.nombre.toLowerCase();
    const marcaExistente = await this.marcaRepository
      .createQueryBuilder('marca')
      .where('LOWER(marca.nombre) = :nombre', { nombre })
      .getOne();

    if (marcaExistente) {
      throw new BadRequestException(`La marca '${createMarcaDto.nombre}' ya existe.`);
    }

    const nuevaMarca = this.marcaRepository.create(createMarcaDto);
    return this.marcaRepository.save(nuevaMarca);
  }

  async findAll(): Promise<Marca[]> {
    return this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepository.findOneBy({ idMarca: id });
    if (!marca) {
      throw new NotFoundException(`Marca con ID '${id}' no encontrada.`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id);

    const marcaActualizada = this.marcaRepository.merge(marca, updateMarcaDto);

    return this.marcaRepository.save(marcaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.marcaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Marca con ID '${id}' no encontrada.`);
    }
  }
}
