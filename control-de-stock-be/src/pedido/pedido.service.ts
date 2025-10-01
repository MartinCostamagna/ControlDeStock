import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { idProveedor, fecha } = createPedidoDto;

    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${idProveedor}' no encontrado.`);
    }

    const nuevoPedido = this.pedidoRepository.create({
      fecha,
      proveedor,
    });

    return this.pedidoRepository.save(nuevoPedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['proveedor', 'detallesPedido'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['proveedor', 'detallesPedido'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID '${id}' no encontrado.`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    if (updatePedidoDto.idProveedor) {
      const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: updatePedidoDto.idProveedor });
      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID '${updatePedidoDto.idProveedor}' no encontrado.`);
      }
      pedido.proveedor = proveedor;
    }

    const pedidoActualizado = this.pedidoRepository.merge(pedido, updatePedidoDto);
    return this.pedidoRepository.save(pedidoActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con ID '${id}' no encontrado.`);
    }
  }
}
