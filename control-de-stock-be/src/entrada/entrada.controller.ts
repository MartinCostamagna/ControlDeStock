import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { CreateEntradaDto } from '../dto/create-entrada.dto';
import { UpdateEntradaDto } from '../dto/update-entrada.dto';
import { Entrada } from '../entities/entrada.entity';

@Controller('entrada')
export class EntradaController {
  constructor(private readonly entradaService: EntradaService) {}

  @Post()
  create(@Body() createEntradaDto: CreateEntradaDto): Promise<Entrada> {
    return this.entradaService.create(createEntradaDto);
  }

  @Get()
  findAll(): Promise<Entrada[]> {
    return this.entradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Entrada> {
    return this.entradaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntradaDto: UpdateEntradaDto,
  ): Promise<Entrada> {
    return this.entradaService.update(id, updateEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.entradaService.remove(id);
  }
}
