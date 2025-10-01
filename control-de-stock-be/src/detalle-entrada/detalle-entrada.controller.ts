import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetalleEntradaService } from './detalle-entrada.service';
import { CreateDetalleEntradaDto } from '../dto/create-detalle-entrada.dto';
import { UpdateDetalleEntradaDto } from '../dto/update-detalle-entrada.dto';
import { DetalleEntrada } from '../entities/detalle-entrada.entity';

@Controller('detalle-entrada')
export class DetalleEntradaController {
  constructor(private readonly detalleEntradaService: DetalleEntradaService) {}

  @Post()
  create(@Body() createDetalleEntradaDto: CreateDetalleEntradaDto): Promise<DetalleEntrada> {
    return this.detalleEntradaService.create(createDetalleEntradaDto);
  }

  @Get()
  findAll(): Promise<DetalleEntrada[]> {
    return this.detalleEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetalleEntrada> {
    return this.detalleEntradaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleEntradaDto: UpdateDetalleEntradaDto,
  ): Promise<DetalleEntrada> {
    return this.detalleEntradaService.update(id, updateDetalleEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.detalleEntradaService.remove(id);
  }
}
