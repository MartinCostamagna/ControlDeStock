import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from '../entities/detalle-venta.entity';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { Venta } from 'src/entities/venta.entity';
import { Producto } from 'src/entities/producto.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { Notificacion } from 'src/entities/notificacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleVenta, Venta, Producto, Notificacion])
  ],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService, NotificacionesService],
  exports: [DetalleVentaService]
})
export class DetalleVentaModule { }
