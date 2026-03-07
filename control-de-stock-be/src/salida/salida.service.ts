import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salida } from '../entities/salida.entity';
import { CreateSalidaDto } from '../dto/create-salida.dto';
import { UpdateSalidaDto } from '../dto/update-salida.dto';
import { DetalleSalidaService } from '../detalle-salida/detalle-salida.service';

@Injectable()
export class SalidaService {
  constructor(
    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,
    private readonly detalleSalidaService: DetalleSalidaService,
  ) { }

  async create(createSalidaDto: CreateSalidaDto): Promise<Salida> {
    const { detalles, motivo } = createSalidaDto;

    if (!detalles || detalles.length === 0) {
      throw new BadRequestException('La salida debe contener al menos un producto.');
    }

    const nuevaSalida = this.salidaRepository.create({
      fecha: new Date(),
      motivo: motivo
    });

    const salidaGuardada = await this.salidaRepository.save(nuevaSalida);

    try {
      const detallesGuardados = await this.detalleSalidaService.createDetails(
        detalles,
        salidaGuardada
      );

      salidaGuardada.detallesSalida = detallesGuardados;
      return salidaGuardada;

    } catch (error) {
      await this.salidaRepository.delete(salidaGuardada.idSalida);
      throw error;
    }
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
