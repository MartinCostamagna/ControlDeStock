import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { Producto } from '../entities/producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @Post()
  create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':codigoDeBarras')
  findOne(@Param('codigoDeBarras') codigoDeBarras: string): Promise<Producto> {
    return this.productoService.findOne(codigoDeBarras);
  }

  @Get('porProveedor/:idProveedor')
  findByProveedor(@Param('idProveedor', ParseIntPipe) idProveedor: number) {
    return this.productoService.findByProveedorId(idProveedor);
  }

  @Patch(':codigoDeBarras')
  update(@Param('codigoDeBarras') codigoDeBarras: string, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto> {
    return this.productoService.update(codigoDeBarras, updateProductoDto);
  }

  @Delete(':codigoDeBarras')
  remove(@Param('codigoDeBarras') codigoDeBarras: string): Promise<void> {
    return this.productoService.remove(codigoDeBarras);
  }
}
