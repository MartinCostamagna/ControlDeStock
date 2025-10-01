<<<<<<< Updated upstream
import { Injectable } from '@nestjs/common';
=======
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSalida } from '../entities/detalle-salida.entity';
import { Salida } from '../entities/salida.entity';
import { Producto } from '../entities/producto.entity';
>>>>>>> Stashed changes
import { CreateDetalleSalidaDto } from '../dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from '../dto/update-detalle-salida.dto';

@Injectable()
export class DetalleSalidaService {
  constructor(
    @InjectRepository(DetalleSalida)
    private readonly detalleSalidaRepository: Repository<DetalleSalida>,

    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createDetalleSalidaDto: CreateDetalleSalidaDto): Promise<DetalleSalida> {
    const { idSalida, idProducto, cantidad } = createDetalleSalidaDto;

    const salida = await this.salidaRepository.findOneBy({ idSalida });
    if (!salida) {
      throw new NotFoundException(`Salida con ID '${idSalida}' no encontrada.`);
    }

    const producto = await this.productoRepository.findOneBy({ codigoDeBarras: idProducto.toString() });
    if (!producto) {
      throw new NotFoundException(`Producto con código de barras '${idProducto}' no encontrado.`);
    }

    if (cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }

    if (cantidad > producto.stock) {
      throw new BadRequestException(`No hay suficiente stock para el producto '${producto.descripcion}'. Stock disponible: ${producto.stock}.`);
    }

    // Actualizar stock del producto
    producto.stock -= cantidad;
    await this.productoRepository.save(producto);

    const nuevoDetalleSalida = this.detalleSalidaRepository.create({
      cantidad,
      salida,
      producto,
    });

    return this.detalleSalidaRepository.save(nuevoDetalleSalida);
  }

  async findAll(): Promise<DetalleSalida[]> {
    return this.detalleSalidaRepository.find({
      relations: ['salida', 'producto'],
    });
  }

  async findOne(id: number): Promise<DetalleSalida> {
    const detalleSalida = await this.detalleSalidaRepository.findOne({
      where: { idDetalleSalida: id },
      relations: ['salida', 'producto'],
    });
    if (!detalleSalida) {
      throw new NotFoundException(`Detalle de salida con ID '${id}' no encontrado.`);
    }
    return detalleSalida;
  }

  async update(id: number, updateDetalleSalidaDto: UpdateDetalleSalidaDto): Promise<DetalleSalida> {
    const detalleSalida = await this.findOne(id);

    if (updateDetalleSalidaDto.idSalida) {
      const salida = await this.salidaRepository.findOneBy({ idSalida: updateDetalleSalidaDto.idSalida });
      if (!salida) {
        throw new NotFoundException(`Salida con ID '${updateDetalleSalidaDto.idSalida}' no encontrada.`);
      }
      detalleSalida.salida = salida;
    }

    if (updateDetalleSalidaDto.idProducto) {
      const producto = await this.productoRepository.findOneBy({ codigoDeBarras: updateDetalleSalidaDto.idProducto.toString() });
      if (!producto) {
        throw new NotFoundException(`Producto con código de barras '${updateDetalleSalidaDto.idProducto}' no encontrado.`);
      }
      detalleSalida.producto = producto;
    }

    if (updateDetalleSalidaDto.cantidad !== undefined && updateDetalleSalidaDto.cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }

    // Ajustar stock si cambia la cantidad
    if (updateDetalleSalidaDto.cantidad !== undefined) {
      const diferencia = updateDetalleSalidaDto.cantidad - detalleSalida.cantidad;
      if (diferencia > 0 && diferencia > detalleSalida.producto.stock) {
        throw new BadRequestException(`No hay suficiente stock para el producto '${detalleSalida.producto.descripcion}'. Stock disponible: ${detalleSalida.producto.stock}.`);
      }
      detalleSalida.producto.stock -= diferencia;
      await this.productoRepository.save(detalleSalida.producto);
    }

    const detalleSalidaActualizado = this.detalleSalidaRepository.merge(detalleSalida, updateDetalleSalidaDto);
    return this.detalleSalidaRepository.save(detalleSalidaActualizado);
  }

  async remove(id: number): Promise<void> {
    const detalleSalida = await this.findOne(id);

    // Devolver stock del producto
    detalleSalida.producto.stock += detalleSalida.cantidad;
    await this.productoRepository.save(detalleSalida.producto);

    const result = await this.detalleSalidaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Detalle de salida con ID '${id}' no encontrado.`);
    }
  }
}
