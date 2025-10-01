import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { Producto } from '../entities/producto.entity';
import { Marca } from '../entities/marca.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';
import { Usuario } from '../entities/usuario.entity';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Entrada } from '../entities/entrada.entity';
import { DetalleEntrada } from '../entities/detalle-entrada.entity';
import { Salida } from '../entities/salida.entity';
import { DetalleSalida } from '../entities/detalle-salida.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'control_stock_db'),
        entities: [
          Producto,
          Marca,
          Categoria,
          Proveedor,
          Ciudad,
          Provincia,
          Pais,
          Usuario,
          Pedido,
          DetallePedido,
          Entrada,
          DetalleEntrada,
          Salida,
          DetalleSalida,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Producto,
      Marca,
      Categoria,
      Proveedor,
      Ciudad,
      Provincia,
      Pais,
      Usuario,
      Pedido,
      DetallePedido,
      Entrada,
      DetalleEntrada,
      Salida,
      DetalleSalida,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
