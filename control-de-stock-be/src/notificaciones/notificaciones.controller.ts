import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacionDto } from '../dto/create-notificacion.dto';
import { UpdateNotificacionDto } from '../dto/update-notificacion.dto';
import { Notificacion } from '../entities/notificacion.entity';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  create(@Body() createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    return this.notificacionesService.create(createNotificacionDto);
  }

  @Get()
  findAll(): Promise<Notificacion[]> {
    return this.notificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notificacion> {
    return this.notificacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacionDto: UpdateNotificacionDto): Promise<Notificacion> {
    return this.notificacionesService.update(+id, updateNotificacionDto);
  }

  @Patch(':id/vista')
  marcarComoVista(@Param('id') id: string): Promise<Notificacion> {
    return this.notificacionesService.marcarComoVista(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notificacionesService.remove(+id);
  }
}
