import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Ciudad])],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
