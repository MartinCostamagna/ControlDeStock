import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { Producto } from '../entities/producto.entity';
import { Marca } from '../entities/marca.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';
>>>>>>> Stashed changes
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from '../entities/producto.entity';
import { Marca } from '../entities/marca.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Producto, Marca, Categoria, Proveedor])],
=======
  imports: [
    TypeOrmModule.forFeature([Producto, Marca, Categoria, Proveedor])
  ],
>>>>>>> Stashed changes
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
