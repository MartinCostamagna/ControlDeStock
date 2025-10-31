

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion, EstadoNotificacion } from '../entities/notificacion.entity';
import { Producto } from '../entities/producto.entity';
import { CreateNotificacionDto } from '../dto/create-notificacion.dto';
import { UpdateNotificacionDto } from '../dto/update-notificacion.dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    const { codigoDeBarras, mensaje, estado = EstadoNotificacion.ENVIADA } = createNotificacionDto;

    const producto = await this.productoRepository.findOneBy({ codigoDeBarras });
    if (!producto) {
      throw new NotFoundException(`Producto con código de barras '${codigoDeBarras}' no encontrado.`);
    }

    const nuevaNotificacion = this.notificacionRepository.create({
      producto,
      mensaje,
      estado,
    });

    return this.notificacionRepository.save(nuevaNotificacion);
  }

  async findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find({
      relations: ['producto'],
      where: { estado: EstadoNotificacion.ENVIADA },
      order: { fechaHora: 'DESC' },
    });
  }

  async findOne(idNotificacion: number): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOne({
      where: { idNotificacion },
      relations: ['producto'],
    });
    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID '${idNotificacion}' no encontrada.`);
    }
    return notificacion;
  }

  async update(idNotificacion: number, updateNotificacionDto: UpdateNotificacionDto): Promise<Notificacion> {
    const notificacion = await this.findOne(idNotificacion);

    const notificacionActualizada = this.notificacionRepository.merge(notificacion, updateNotificacionDto);
    return this.notificacionRepository.save(notificacionActualizada);
  }

  async remove(idNotificacion: number): Promise<void> {
    const notificacion = await this.findOne(idNotificacion);
    notificacion.estado = EstadoNotificacion.ELIMINADA;
    await this.notificacionRepository.save(notificacion);
  }

  async marcarComoVista(idNotificacion: number): Promise<Notificacion> {
    return this.update(idNotificacion, { estado: EstadoNotificacion.VISTA });
  }

  async verificarStockBajo(producto: Producto): Promise<void> {
    if (producto.stock < producto.stockMinimo) {
      // Verificar si ya existe una notificación activa para este producto
      const notificacionExistente = await this.notificacionRepository.findOne({
        where: {
          producto: { codigoDeBarras: producto.codigoDeBarras },
          estado: EstadoNotificacion.ENVIADA,
        },
      });

      if (!notificacionExistente) {
        const mensaje = `El producto ${producto.descripcion} está por debajo de su stock mínimo de ${producto.stockMinimo} unidades`;
        await this.create({
          codigoDeBarras: producto.codigoDeBarras,
          mensaje,
        });
      }
    }
  }
}
