import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from '../entities/detalle-venta.entity';
import { Venta } from '../entities/venta.entity';
import { Producto } from '../entities/producto.entity';
import { CreateDetalleVentaDto } from '../dto/create-detalle-venta.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta) private readonly detVentaRepo: Repository<DetalleVenta>,
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    private readonly notificacionesService: NotificacionesService,
  ) { }

  async create(detallesDto: CreateDetalleVentaDto[], venta: Venta): Promise<DetalleVenta[]> {
    const detallesParaGuardar: DetalleVenta[] = [];
    const productosParaActualizar: Producto[] = [];

    for (const dto of detallesDto) {
      const producto = await this.productoRepo.findOneBy({ codigoDeBarras: dto.codigoDeBarras });
      if (!producto) throw new NotFoundException(`Producto ${dto.codigoDeBarras} no encontrado`);

      if (producto.stock < dto.cantidad) {
        throw new BadRequestException(`Stock insuficiente para ${producto.descripcion}. Disponible: ${producto.stock}`);
      }

      const nuevoDetalle = this.detVentaRepo.create({
        ...dto,
        venta,
        producto,
      });

      producto.stock -= dto.cantidad;
      detallesParaGuardar.push(nuevoDetalle);
      productosParaActualizar.push(producto);
    }

    await this.productoRepo.save(productosParaActualizar);
    for (const p of productosParaActualizar) {
      await this.notificacionesService.verificarStockBajo(p);
    }

    return this.detVentaRepo.save(detallesParaGuardar);
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detVentaRepo.find({ relations: ['producto', 'venta'] });
  }

  async findOne(id: number): Promise<DetalleVenta> {
    const detalle = await this.detVentaRepo.findOne({
      where: { idDetalleVenta: id },
      relations: ['producto', 'venta']
    });
    if (!detalle) throw new NotFoundException(`Detalle de venta #${id} no encontrado`);
    return detalle;
  }

  async remove(id: number): Promise<void> {
    const detalle = await this.findOne(id);
    const producto = detalle.producto;
    producto.stock += Number(detalle.cantidad);
    await this.productoRepo.save(producto);

    await this.detVentaRepo.delete(id);
  }
}