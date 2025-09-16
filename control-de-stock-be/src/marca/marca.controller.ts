import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { Marca } from '../entities/marca.entity';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto): Promise<Marca> {
    return this.marcaService.create(createMarcaDto);
  }

  @Get()
  findAll(): Promise<Marca[]> {
    return this.marcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Marca> {
    return this.marcaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMarcaDto: UpdateMarcaDto,
  ): Promise<Marca> {
    return this.marcaService.update(id, updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
