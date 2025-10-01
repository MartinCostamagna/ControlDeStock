import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from '../dto/create-provincia.dto';
import { UpdateProvinciaDto } from '../dto/update-provincia.dto';
import { Provincia } from '../entities/provincia.entity';

@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Post()
  create(@Body() createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    return this.provinciaService.create(createProvinciaDto);
  }

  @Get()
  findAll(): Promise<Provincia[]> {
    return this.provinciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Provincia> {
    return this.provinciaService.findOne(id);
  }

  @Patch(':id')
<<<<<<< Updated upstream
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia> {
=======
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProvinciaDto: UpdateProvinciaDto,
  ): Promise<Provincia> {
>>>>>>> Stashed changes
    return this.provinciaService.update(id, updateProvinciaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.provinciaService.remove(id);
  }
}
