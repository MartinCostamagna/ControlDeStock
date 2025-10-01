import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Marca } from '../entities/marca.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Marca, Categoria, Proveedor])
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
