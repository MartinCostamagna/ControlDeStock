import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salida } from '../entities/salida.entity';
import { SalidaService } from './salida.service';
import { SalidaController } from './salida.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salida])
  ],
  controllers: [SalidaController],
  providers: [SalidaService],
})
export class SalidaModule {}
