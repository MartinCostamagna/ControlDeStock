//src\detalle-entrada\detalle-entrada.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEntrada } from '../entities/detalle-entrada.entity';
import { Entrada } from '../entities/entrada.entity';
import { Producto } from '../entities/producto.entity';
import { CreateDetalleEntradaDto } from '../dto/create-detalle-entrada.dto';
import { UpdateDetalleEntradaDto } from '../dto/update-detalle-entrada.dto';

@Injectable()
export class DetalleEntradaService {
  constructor(
    @InjectRepository(DetalleEntrada)
    private readonly detalleEntradaRepository: Repository<DetalleEntrada>,

    @InjectRepository(Entrada)
    private readonly entradaRepository: Repository<Entrada>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }


  async create(createDetalleEntradaDto: CreateDetalleEntradaDto): Promise<DetalleEntrada> {
    const { idEntrada, codigoDeBarras, cantidad } = createDetalleEntradaDto;

    const entrada = await this.entradaRepository.findOneBy({ idEntrada });
    if (!entrada) {
      throw new NotFoundException(`Entrada con ID '${idEntrada}' no encontrada.`);
    }
    const producto = await this.productoRepository.findOneBy({ codigoDeBarras });
    if (!producto) {
      throw new NotFoundException(`Producto con código de barras '${codigoDeBarras}' no encontrado.`);
    }

    if (cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }
    producto.stock += cantidad;
    await this.productoRepository.save(producto);

    const nuevoDetalle = this.detalleEntradaRepository.create({
      cantidad,
      entrada,
      producto,
    });

    return this.detalleEntradaRepository.save(nuevoDetalle);
  }

  async createDetails(
    detallesDto: CreateDetalleEntradaDto[],
    entrada: Entrada
  ): Promise<DetalleEntrada[]> {
    const detallesParaGuardar: DetalleEntrada[] = [];
    const productosParaActualizar: Producto[] = [];

    for (const detalleDto of detallesDto) {
      const { codigoDeBarras, cantidad } = detalleDto;

      const producto = await this.productoRepository.findOneBy({ codigoDeBarras });
      if (!producto) {
        throw new NotFoundException(`Producto '${codigoDeBarras}' no encontrado.`);
      }

      if (cantidad <= 0) {
        throw new BadRequestException(`La cantidad de '${producto.descripcion}' debe ser mayor a 0.`);
      }

      const nuevoDetalle = this.detalleEntradaRepository.create({
        cantidad,
        entrada,
        producto,
      });

      producto.stock += cantidad;

      detallesParaGuardar.push(nuevoDetalle);
      productosParaActualizar.push(producto);
    }

    await this.productoRepository.save(productosParaActualizar);
    return this.detalleEntradaRepository.save(detallesParaGuardar);
  }

  async findAll(): Promise<DetalleEntrada[]> {
    return this.detalleEntradaRepository.find({
      relations: ['entrada', 'producto'],
    });
  }

  async findOne(id: number): Promise<DetalleEntrada> {
    const detalleEntrada = await this.detalleEntradaRepository.findOne({
      where: { idDetalleEntrada: id },
      relations: ['entrada', 'producto'],
    });
    if (!detalleEntrada) {
      throw new NotFoundException(`DetalleEntrada con ID '${id}' no encontrada.`);
    }
    return detalleEntrada;
  }

  async update(id: number, updateDetalleEntradaDto: UpdateDetalleEntradaDto): Promise<DetalleEntrada> {
    const detalleEntrada = await this.findOne(id);

    if (updateDetalleEntradaDto.idEntrada) {
      const entrada = await this.entradaRepository.findOneBy({ idEntrada: updateDetalleEntradaDto.idEntrada });
      if (!entrada) {
        throw new NotFoundException(`Entrada con ID '${updateDetalleEntradaDto.idEntrada}' no encontrada.`);
      }
      detalleEntrada.entrada = entrada;
    }

    if (updateDetalleEntradaDto.codigoDeBarras) {
      const producto = await this.productoRepository.findOneBy({ codigoDeBarras: updateDetalleEntradaDto.codigoDeBarras });
      if (!producto) {
        throw new NotFoundException(`Producto con código de barras '${updateDetalleEntradaDto.codigoDeBarras}' no encontrado.`);
      }
      detalleEntrada.producto = producto;
    }

    if (updateDetalleEntradaDto.cantidad !== undefined && updateDetalleEntradaDto.cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0.');
    }

    // Ajustar stock si cambia la cantidad
    if (updateDetalleEntradaDto.cantidad !== undefined) {
      const diferencia = updateDetalleEntradaDto.cantidad - detalleEntrada.cantidad;
      detalleEntrada.producto.stock += diferencia;
      await this.productoRepository.save(detalleEntrada.producto);
    }

    const detalleEntradaActualizada = this.detalleEntradaRepository.merge(detalleEntrada, updateDetalleEntradaDto);
    return this.detalleEntradaRepository.save(detalleEntradaActualizada);
  }

  async remove(id: number): Promise<void> {
    const detalleEntrada = await this.findOne(id);

    // Restar stock del producto
    detalleEntrada.producto.stock -= detalleEntrada.cantidad;
    await this.productoRepository.save(detalleEntrada.producto);

    const result = await this.detalleEntradaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DetalleEntrada con ID '${id}' no encontrada.`);
    }
  }
}
