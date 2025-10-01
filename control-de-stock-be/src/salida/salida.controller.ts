import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SalidaService } from './salida.service';
import { CreateSalidaDto } from '../dto/create-salida.dto';
import { UpdateSalidaDto } from '../dto/update-salida.dto';
import { Salida } from '../entities/salida.entity';

@Controller('salida')
export class SalidaController {
  constructor(private readonly salidaService: SalidaService) {}

  @Post()
  create(@Body() createSalidaDto: CreateSalidaDto): Promise<Salida> {
    return this.salidaService.create(createSalidaDto);
  }

  @Get()
  findAll(): Promise<Salida[]> {
    return this.salidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Salida> {
    return this.salidaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSalidaDto: UpdateSalidaDto,
  ): Promise<Salida> {
    return this.salidaService.update(id, updateSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salidaService.remove(id);
  }
}
