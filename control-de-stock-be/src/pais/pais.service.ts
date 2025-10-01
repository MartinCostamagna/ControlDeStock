import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from '../entities/pais.entity';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { UpdatePaisDto } from '../dto/update-pais.dto';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const nombre = createPaisDto.nombre.toLowerCase();
    const paisExistente = await this.paisRepository
      .createQueryBuilder('pais')
      .where('LOWER(pais.nombre) = :nombre', { nombre })
      .getOne();

    if (paisExistente) {
      throw new BadRequestException(`El país '${createPaisDto.nombre}' ya existe.`);
    }

    const nuevoPais = this.paisRepository.create(createPaisDto);
    return this.paisRepository.save(nuevoPais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOneBy({ idPais: id });
    if (!pais) {
      throw new NotFoundException(`País con ID '${id}' no encontrado.`);
    }
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id);

    const paisActualizado = this.paisRepository.merge(pais, updatePaisDto);

    return this.paisRepository.save(paisActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paisRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`País con ID '${id}' no encontrado.`);
    }
  }
}
