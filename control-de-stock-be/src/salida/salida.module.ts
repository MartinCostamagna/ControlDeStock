import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salida } from '../entities/salida.entity';
import { SalidaService } from './salida.service';
import { SalidaController } from './salida.controller';
import { DetalleSalidaModule } from 'src/detalle-salida/detalle-salida.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salida]),
    DetalleSalidaModule
  ],
  controllers: [SalidaController],
  providers: [SalidaService],
})
export class SalidaModule { }
