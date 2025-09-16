import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from '../dto/create-ciudad.dto';
import { UpdateCiudadDto } from '../dto/update-ciudad.dto';
import { Ciudad } from '../entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    return this.ciudadService.create(createCiudadDto);
  }

  @Get()
  findAll(): Promise<Ciudad[]> {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Ciudad> {
    return this.ciudadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ciudadService.remove(id);
  }
}
