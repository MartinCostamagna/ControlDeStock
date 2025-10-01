import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor, Ciudad])
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
