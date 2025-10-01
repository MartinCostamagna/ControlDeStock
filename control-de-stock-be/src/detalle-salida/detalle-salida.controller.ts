import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetalleSalidaService } from './detalle-salida.service';
import { CreateDetalleSalidaDto } from '../dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from '../dto/update-detalle-salida.dto';
<<<<<<< Updated upstream
=======
import { DetalleSalida } from '../entities/detalle-salida.entity';
>>>>>>> Stashed changes

@Controller('detalle-salida')
export class DetalleSalidaController {
  constructor(private readonly detalleSalidaService: DetalleSalidaService) {}

  @Post()
  create(@Body() createDetalleSalidaDto: CreateDetalleSalidaDto): Promise<DetalleSalida> {
    return this.detalleSalidaService.create(createDetalleSalidaDto);
  }

  @Get()
  findAll(): Promise<DetalleSalida[]> {
    return this.detalleSalidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetalleSalida> {
    return this.detalleSalidaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleSalidaDto: UpdateDetalleSalidaDto,
  ): Promise<DetalleSalida> {
    return this.detalleSalidaService.update(id, updateDetalleSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.detalleSalidaService.remove(id);
  }
}
