import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { Marca } from '../entities/marca.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    private readonly notificacionesService: NotificacionesService,
  ) { }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { codigoDeBarras, descripcion, precioCosto, porcentajeGanancia, stock, stockMinimo, idMarca, idCategoria, idProveedor } = createProductoDto;

    const productoExistente = await this.productoRepository.findOneBy({ codigoDeBarras });
    if (productoExistente) {
      throw new BadRequestException(`El producto con código de barras '${codigoDeBarras}' ya existe.`);
    }

    const marca = await this.marcaRepository.findOneBy({ idMarca });
    if (!marca) {
      throw new NotFoundException(`Marca con ID '${idMarca}' no encontrada.`);
    }

    const categoria = await this.categoriaRepository.findOneBy({ idCategoria });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID '${idCategoria}' no encontrada.`);
    }

    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${idProveedor}' no encontrado.`);
    }

    const nuevoProducto = this.productoRepository.create({
      codigoDeBarras,
      descripcion,
      precioCosto,
      porcentajeGanancia,
      stock,
      stockMinimo,
      marca,
      categoria,
      proveedor,
    });

    return this.productoRepository.save(nuevoProducto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['marca', 'categoria', 'proveedor'],
    });
  }

  async findOne(codigoDeBarras: string): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { codigoDeBarras },
      relations: ['marca', 'categoria', 'proveedor'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con código de barras '${codigoDeBarras}' no encontrado.`);
    }
    return producto;
  }

  async update(codigoDeBarras: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(codigoDeBarras);

    if (updateProductoDto.idMarca) {
      const marca = await this.marcaRepository.findOneBy({ idMarca: updateProductoDto.idMarca });
      if (!marca) {
        throw new NotFoundException(`Marca con ID '${updateProductoDto.idMarca}' no encontrada.`);
      }
      producto.marca = marca;
    }

    if (updateProductoDto.idCategoria) {
      const categoria = await this.categoriaRepository.findOneBy({ idCategoria: updateProductoDto.idCategoria });
      if (!categoria) {
        throw new NotFoundException(`Categoría con ID '${updateProductoDto.idCategoria}' no encontrada.`);
      }
      producto.categoria = categoria;
    }

    if (updateProductoDto.idProveedor) {
      const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: updateProductoDto.idProveedor });
      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID '${updateProductoDto.idProveedor}' no encontrado.`);
      }
      producto.proveedor = proveedor;
    }

    const productoActualizado = this.productoRepository.merge(producto, updateProductoDto);
    const productoGuardado = await this.productoRepository.save(productoActualizado);

    // Verificar si se debe generar una notificación de stock bajo
    await this.notificacionesService.verificarStockBajo(productoGuardado);

    return productoGuardado;
  }

  async remove(codigoDeBarras: string): Promise<void> {
    const result = await this.productoRepository.delete(codigoDeBarras);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con código de barras '${codigoDeBarras}' no encontrado.`);
    }
  }
}
