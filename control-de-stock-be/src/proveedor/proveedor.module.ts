import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
>>>>>>> Stashed changes
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Proveedor, Ciudad])],
=======
  imports: [
    TypeOrmModule.forFeature([Proveedor, Ciudad])
  ],
>>>>>>> Stashed changes
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
