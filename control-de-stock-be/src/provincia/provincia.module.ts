import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';
>>>>>>> Stashed changes
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Provincia, Pais])],
=======
  imports: [
    TypeOrmModule.forFeature([Provincia, Pais])
  ],
>>>>>>> Stashed changes
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
