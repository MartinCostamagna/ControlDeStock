import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSalida } from '../entities/detalle-salida.entity';
import { Salida } from '../entities/salida.entity';
import { Producto } from '../entities/producto.entity';
import { DetalleSalidaService } from './detalle-salida.service';
import { DetalleSalidaController } from './detalle-salida.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleSalida, Salida, Producto])
  ],
  controllers: [DetalleSalidaController],
  providers: [DetalleSalidaService],
})
export class DetalleSalidaModule {}
