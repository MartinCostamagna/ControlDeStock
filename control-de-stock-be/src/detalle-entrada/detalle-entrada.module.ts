import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEntrada } from '../entities/detalle-entrada.entity';
import { Entrada } from '../entities/entrada.entity';
import { Producto } from '../entities/producto.entity';
import { DetalleEntradaService } from './detalle-entrada.service';
import { DetalleEntradaController } from './detalle-entrada.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleEntrada, Entrada, Producto])
  ],
  controllers: [DetalleEntradaController],
  providers: [DetalleEntradaService],
})
export class DetalleEntradaModule {}
