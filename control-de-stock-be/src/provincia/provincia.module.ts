import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provincia, Pais])
  ],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
  exports: [ProvinciaService],
})
export class ProvinciaModule {}
