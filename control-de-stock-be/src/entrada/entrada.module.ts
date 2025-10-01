import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from '../entities/entrada.entity';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrada])
  ],
  controllers: [EntradaController],
  providers: [EntradaService],
})
export class EntradaModule {}
