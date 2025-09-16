import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';
import { Proveedor } from '../entities/proveedor.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    return this.proveedorService.create(createProveedorDto);
  }

  @Get()
  findAll(): Promise<Proveedor[]> {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> {
    return this.proveedorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ): Promise<Proveedor> {
    return this.proveedorService.update(id, updateProveedorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.proveedorService.remove(id);
  }
}
