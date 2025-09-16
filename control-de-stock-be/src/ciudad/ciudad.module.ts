import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from '../entities/ciudad.entity';
import { Provincia } from '../entities/provincia.entity';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Provincia])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
