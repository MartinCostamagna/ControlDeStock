<<<<<<< Updated upstream
import { Injectable } from '@nestjs/common';
=======
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salida } from '../entities/salida.entity';
>>>>>>> Stashed changes
import { CreateSalidaDto } from '../dto/create-salida.dto';
import { UpdateSalidaDto } from '../dto/update-salida.dto';

@Injectable()
export class SalidaService {
  constructor(
    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,
  ) {}

  async create(createSalidaDto: CreateSalidaDto): Promise<Salida> {
    const nuevaSalida = this.salidaRepository.create(createSalidaDto);
    return this.salidaRepository.save(nuevaSalida);
  }

  async findAll(): Promise<Salida[]> {
    return this.salidaRepository.find({
      relations: ['detallesSalida'],
    });
  }

  async findOne(id: number): Promise<Salida> {
    const salida = await this.salidaRepository.findOne({
      where: { idSalida: id },
      relations: ['detallesSalida'],
    });
    if (!salida) {
      throw new NotFoundException(`Salida con ID '${id}' no encontrada.`);
    }
    return salida;
  }

  async update(id: number, updateSalidaDto: UpdateSalidaDto): Promise<Salida> {
    const salida = await this.findOne(id);
    const salidaActualizada = this.salidaRepository.merge(salida, updateSalidaDto);
    return this.salidaRepository.save(salidaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.salidaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Salida con ID '${id}' no encontrada.`);
    }
  }
}
