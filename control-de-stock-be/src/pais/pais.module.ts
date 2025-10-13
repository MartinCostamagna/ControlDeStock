import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from '../entities/pais.entity';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pais])
  ],
  controllers: [PaisController],
  providers: [PaisService],
  exports: [PaisService],
})
export class PaisModule {}
