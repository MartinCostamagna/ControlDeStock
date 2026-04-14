import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from '../entities/venta.entity';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { DetalleVentaModule } from 'src/detalle-venta/detalle-venta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]), DetalleVentaModule
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule { }
