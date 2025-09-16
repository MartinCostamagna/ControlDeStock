import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { UpdatePaisDto } from '../dto/update-pais.dto';
import { Pais } from '../entities/pais.entity';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Post()
  create(@Body() createPaisDto: CreatePaisDto): Promise<Pais> {
    return this.paisService.create(createPaisDto);
  }

  @Get()
  findAll(): Promise<Pais[]> {
    return this.paisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pais> {
    return this.paisService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaisDto: UpdatePaisDto,
  ): Promise<Pais> {
    return this.paisService.update(id, updatePaisDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.paisService.remove(id);
  }
}
