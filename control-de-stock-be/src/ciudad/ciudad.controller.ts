import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from '../dto/create-ciudad.dto';
import { UpdateCiudadDto } from '../dto/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) { }

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(+id);
  }

  @Get('by-provincia/:idProvincia')
  findByProvincia(@Param('idProvincia') idProvincia: number) {
    return this.ciudadService.findByProvinciaId(idProvincia);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(+id, updateCiudadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadService.remove(+id);
  }
}
