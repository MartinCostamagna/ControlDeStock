import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import { CreateVentaDto } from '../dto/create-venta.dto';
import { UpdateVentaDto } from '../dto/update-venta.dto';
import { DetalleVentaService } from '../detalle-venta/detalle-venta.service';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private readonly ventaRepo: Repository<Venta>,
    private readonly detalleVentaService: DetalleVentaService,
  ) { }

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const { detalles } = createVentaDto;
    if (!detalles || detalles.length === 0) throw new BadRequestException('La venta no tiene productos');

    const nuevaVenta = this.ventaRepo.create({
      fecha: createVentaDto.fecha || new Date()
    });
    const ventaGuardada = await this.ventaRepo.save(nuevaVenta);

    try {
      const detallesGuardados = await this.detalleVentaService.create(detalles, ventaGuardada);
      ventaGuardada.detallesVenta = detallesGuardados;
      return ventaGuardada;
    } catch (error) {
      await this.ventaRepo.delete(ventaGuardada.idVenta);
      throw error;
    }
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepo.find({
      relations: ['detallesVenta', 'detallesVenta.producto'],
      order: { fecha: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepo.findOne({
      where: { idVenta: id },
      relations: ['detallesVenta', 'detallesVenta.producto'],
    });
    if (!venta) throw new NotFoundException(`Venta con ID #${id} no encontrada`);
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    const ventaActualizada = this.ventaRepo.merge(venta, updateVentaDto);
    return this.ventaRepo.save(ventaActualizada);
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id);
    for (const detalle of venta.detallesVenta) {
      await this.detalleVentaService.remove(detalle.idDetalleVenta);
    }

    const result = await this.ventaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`No se pudo eliminar la venta #${id}`);
  }
}