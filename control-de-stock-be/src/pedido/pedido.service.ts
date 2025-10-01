<<<<<<< Updated upstream
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
=======
import { Injectable, NotFoundException } from '@nestjs/common';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
<<<<<<< Updated upstream
    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: createPedidoDto.idProveedor });
    if (!proveedor) {
      throw new BadRequestException(`El proveedor con ID '${createPedidoDto.idProveedor}' no existe.`);
    }

    const nuevoPedido = this.pedidoRepository.create({
      ...createPedidoDto,
      proveedor: proveedor,
=======
    const { idProveedor, fecha } = createPedidoDto;

    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${idProveedor}' no encontrado.`);
    }

    const nuevoPedido = this.pedidoRepository.create({
      fecha,
      proveedor,
>>>>>>> Stashed changes
    });

    return this.pedidoRepository.save(nuevoPedido);
  }

  async findAll(): Promise<Pedido[]> {
<<<<<<< Updated upstream
    return this.pedidoRepository.find({ relations: ['proveedor', 'detallesPedido'] });
=======
    return this.pedidoRepository.find({
      relations: ['proveedor', 'detallesPedido'],
    });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['proveedor', 'detallesPedido'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID '${id}' no encontrado.`);
    }
=======
    const pedido = await this.findOne(id);
>>>>>>> Stashed changes

    if (updatePedidoDto.idProveedor) {
      const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: updatePedidoDto.idProveedor });
      if (!proveedor) {
<<<<<<< Updated upstream
        throw new BadRequestException(`El proveedor con ID '${updatePedidoDto.idProveedor}' no existe.`);
=======
        throw new NotFoundException(`Proveedor con ID '${updatePedidoDto.idProveedor}' no encontrado.`);
>>>>>>> Stashed changes
      }
      pedido.proveedor = proveedor;
    }

    const pedidoActualizado = this.pedidoRepository.merge(pedido, updatePedidoDto);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    return this.pedidoRepository.save(pedidoActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepository.delete(id);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con ID '${id}' no encontrado.`);
    }
  }
}
