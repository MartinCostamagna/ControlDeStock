import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { Marca } from '../entities/marca.entity';
>>>>>>> Stashed changes
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from '../entities/marca.entity';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Marca])],
=======
  imports: [
    TypeOrmModule.forFeature([Marca])
  ],
>>>>>>> Stashed changes
  controllers: [MarcaController],
  providers: [MarcaService],
})
export class MarcaModule {}
