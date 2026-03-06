import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from '../entities/entrada.entity';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';
import { DetalleEntradaModule } from 'src/detalle-entrada/detalle-entrada.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrada]),
    DetalleEntradaModule,
  ],
  controllers: [EntradaController],
  providers: [EntradaService],
  exports: [EntradaService],
})
export class EntradaModule { }
