//src\usuario\usuario.controller.ts
import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ): Promise<Usuario> {
    return this.usuariosService.update(id, updateUsuarioDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
