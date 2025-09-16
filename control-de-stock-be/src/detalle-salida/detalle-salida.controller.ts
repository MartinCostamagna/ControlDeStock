import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleSalidaService } from './detalle-salida.service';
import { CreateDetalleSalidaDto } from '../dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from '../dto/update-detalle-salida.dto';

@Controller('detalle-salida')
export class DetalleSalidaController {
  constructor(private readonly detalleSalidaService: DetalleSalidaService) {}

  @Post()
  create(@Body() createDetalleSalidaDto: CreateDetalleSalidaDto) {
    return this.detalleSalidaService.create(createDetalleSalidaDto);
  }

  @Get()
  findAll() {
    return this.detalleSalidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleSalidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleSalidaDto: UpdateDetalleSalidaDto) {
    return this.detalleSalidaService.update(+id, updateDetalleSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleSalidaService.remove(+id);
  }
}
