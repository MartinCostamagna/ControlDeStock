import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { Pais } from '../entities/pais.entity';
>>>>>>> Stashed changes
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais } from '../entities/pais.entity';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Pais])],
=======
  imports: [
    TypeOrmModule.forFeature([Pais])
  ],
>>>>>>> Stashed changes
  controllers: [PaisController],
  providers: [PaisService],
})
export class PaisModule {}
