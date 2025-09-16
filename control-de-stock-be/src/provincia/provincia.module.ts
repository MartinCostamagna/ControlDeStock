import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia, Pais])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
