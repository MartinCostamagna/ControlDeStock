import { Module } from '@nestjs/common';
import { DetalleSalidaService } from './detalle-salida.service';
import { DetalleSalidaController } from './detalle-salida.controller';

@Module({
  controllers: [DetalleSalidaController],
  providers: [DetalleSalidaService],
})
export class DetalleSalidaModule {}
