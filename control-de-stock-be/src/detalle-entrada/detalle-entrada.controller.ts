import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleEntradaService } from './detalle-entrada.service';
import { CreateDetalleEntradaDto } from './dto/create-detalle-entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle-entrada.dto';

@Controller('detalle-entrada')
export class DetalleEntradaController {
  constructor(private readonly detalleEntradaService: DetalleEntradaService) {}

  @Post()
  create(@Body() createDetalleEntradaDto: CreateDetalleEntradaDto) {
    return this.detalleEntradaService.create(createDetalleEntradaDto);
  }

  @Get()
  findAll() {
    return this.detalleEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleEntradaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleEntradaDto: UpdateDetalleEntradaDto) {
    return this.detalleEntradaService.update(+id, updateDetalleEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleEntradaService.remove(+id);
  }
}
