import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from '../entities/detalle-venta.entity';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { Venta } from 'src/entities/venta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleVenta, Venta])
  ],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule { }
