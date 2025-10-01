import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
<<<<<<< Updated upstream
=======
import { Producto } from '../entities/producto.entity';
>>>>>>> Stashed changes

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

<<<<<<< Updated upstream
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(id);
=======
  @Get(':codigoDeBarras')
  findOne(@Param('codigoDeBarras') codigoDeBarras: string): Promise<Producto> {
    return this.productoService.findOne(codigoDeBarras);
  }

  @Patch(':codigoDeBarras')
  update(@Param('codigoDeBarras') codigoDeBarras: string, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto> {
    return this.productoService.update(codigoDeBarras, updateProductoDto);
  }

  @Delete(':codigoDeBarras')
  remove(@Param('codigoDeBarras') codigoDeBarras: string): Promise<void> {
    return this.productoService.remove(codigoDeBarras);
>>>>>>> Stashed changes
  }
}
