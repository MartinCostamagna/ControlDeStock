import { Module } from '@nestjs/common';
import { DetalleEntradaService } from './detalle-entrada.service';
import { DetalleEntradaController } from './detalle-entrada.controller';

@Module({
  controllers: [DetalleEntradaController],
  providers: [DetalleEntradaService],
})
export class DetalleEntradaModule {}
