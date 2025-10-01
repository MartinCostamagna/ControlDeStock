<<<<<<< Updated upstream
import { Injectable } from '@nestjs/common';
=======
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Pedido } from '../entities/pedido.entity';
import { Producto } from '../entities/producto.entity';
>>>>>>> Stashed changes
import { CreateDetallePedidoDto } from '../dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from '../dto/update-detalle-pedido.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,

    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const { idPedido, idProducto, cantidad } = createDetallePedidoDto;

    const pedido = await this.pedidoRepository.findOneBy({ idPedido });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID '${idPedido}' no encontrado.`);
    }

    const producto = await this.productoRepository.findOneBy({ codigoDeBarras: idProducto.toString() });
    if (!producto) {
      throw new NotFoundException(`Producto con código de barras '${idProducto}' no encontrado.`);
    }

    if (cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }

    const nuevoDetallePedido = this.detallePedidoRepository.create({
      cantidad,
      pedido,
      producto,
    });

    return this.detallePedidoRepository.save(nuevoDetallePedido);
  }

  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({
      relations: ['pedido', 'producto'],
    });
  }

  async findOne(id: number): Promise<DetallePedido> {
    const detallePedido = await this.detallePedidoRepository.findOne({
      where: { idDetallePedido: id },
      relations: ['pedido', 'producto'],
    });
    if (!detallePedido) {
      throw new NotFoundException(`Detalle de pedido con ID '${id}' no encontrado.`);
    }
    return detallePedido;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = await this.findOne(id);

    if (updateDetallePedidoDto.idPedido) {
      const pedido = await this.pedidoRepository.findOneBy({ idPedido: updateDetallePedidoDto.idPedido });
      if (!pedido) {
        throw new NotFoundException(`Pedido con ID '${updateDetallePedidoDto.idPedido}' no encontrado.`);
      }
      detallePedido.pedido = pedido;
    }

    if (updateDetallePedidoDto.idProducto) {
      const producto = await this.productoRepository.findOneBy({ codigoDeBarras: updateDetallePedidoDto.idProducto.toString() });
      if (!producto) {
        throw new NotFoundException(`Producto con código de barras '${updateDetallePedidoDto.idProducto}' no encontrado.`);
      }
      detallePedido.producto = producto;
    }

    if (updateDetallePedidoDto.cantidad !== undefined && updateDetallePedidoDto.cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }

    const detallePedidoActualizado = this.detallePedidoRepository.merge(detallePedido, updateDetallePedidoDto);
    return this.detallePedidoRepository.save(detallePedidoActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.detallePedidoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Detalle de pedido con ID '${id}' no encontrado.`);
    }
  }
}
