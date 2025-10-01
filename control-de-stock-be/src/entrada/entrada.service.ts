import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrada } from '../entities/entrada.entity';
import { CreateEntradaDto } from '../dto/create-entrada.dto';
import { UpdateEntradaDto } from '../dto/update-entrada.dto';

@Injectable()
export class EntradaService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepository: Repository<Entrada>,
  ) {}

  async create(createEntradaDto: CreateEntradaDto): Promise<Entrada> {
    const nuevaEntrada = this.entradaRepository.create(createEntradaDto);
    return this.entradaRepository.save(nuevaEntrada);
  }

  async findAll(): Promise<Entrada[]> {
    return this.entradaRepository.find({
      relations: ['detallesEntrada'],
    });
  }

  async findOne(id: number): Promise<Entrada> {
    const entrada = await this.entradaRepository.findOne({
      where: { idEntrada: id },
      relations: ['detallesEntrada'],
    });
    if (!entrada) {
      throw new NotFoundException(`Entrada con ID '${id}' no encontrada.`);
    }
    return entrada;
  }

  async update(id: number, updateEntradaDto: UpdateEntradaDto): Promise<Entrada> {
    const entrada = await this.findOne(id);
    const entradaActualizada = this.entradaRepository.merge(entrada, updateEntradaDto);
    return this.entradaRepository.save(entradaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.entradaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entrada con ID '${id}' no encontrada.`);
    }
  }
}
