import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioService } from './user.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdatePutUsuarioDto } from '../dto/update-put-usuario.dto';
import { UpdatePatchUsuarioDto } from '../dto/update-patch-usuario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioRole } from '../entities/usuario.entity';
import { UsuarioResponseDto } from '../interfaces/usuario.interfaces';

import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.log(`Creando usuarioa: ${createUsuarioDto.email}`);
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN, UsuarioRole.MODERATOR)
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<UsuarioResponseDto>> {
    this.logger.log(
      `Buscando todas las usuarioas con paginación: ${JSON.stringify(paginationDto)}`,
    );
    return this.usuarioService.findAll(paginationDto);
  }

  @Get('search')
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN, UsuarioRole.MODERATOR)
  async searchByName(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<UsuarioResponseDto>> {
    const name = paginationDto.name;
    this.logger.log(
      `Buscando usuarioas por nombre: ${name} con paginación: ${JSON.stringify(paginationDto)}`,
    );
    if (!name || name.trim() === '') {
      throw new BadRequestException(
        'El término de búsqueda "name" no puede estar vacío para esta operación.',
      );
    }
    return this.usuarioService.findByName(name, paginationDto);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN, UsuarioRole.MODERATOR)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UsuarioResponseDto> {
    this.logger.log(`Buscando usuarioa ID: ${id}`);
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePutUsuarioDto: UpdatePutUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.log(`Actualizando (PUT) usuarioa ID: ${id}`);
    return this.usuarioService.updatePut(id, updatePutUsuarioDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  updatePatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatchUsuarioDto: UpdatePatchUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    this.logger.log(`Actualizando (PATCH) usuarioa ID: ${id}`);
    return this.usuarioService.update(id, updatePatchUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    this.logger.log(`Eliminando usuarioa ID: ${id}`);
    return this.usuarioService.remove(id);
  }
}
