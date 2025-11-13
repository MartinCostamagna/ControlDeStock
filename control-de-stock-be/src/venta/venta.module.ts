import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from '../entities/venta.entity';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]),
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule { }
