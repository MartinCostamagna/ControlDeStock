import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
=======
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
>>>>>>> Stashed changes
import { CiudadModule } from './ciudad/ciudad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { PaisModule } from './pais/pais.module';
import { UsuarioModule } from './usuario/usuario.module';
<<<<<<< Updated upstream
=======
import { EntradaModule } from './entrada/entrada.module';
import { DetalleEntradaModule } from './detalle-entrada/detalle-entrada.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { DetalleSalidaModule } from './detalle-salida/detalle-salida.module';
import { PedidoModule } from './pedido/pedido.module';
>>>>>>> Stashed changes
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { MarcaModule } from './marca/marca.module';
import { ProveedorModule } from './proveedor/proveedor.module';
<<<<<<< Updated upstream
import { PedidoModule } from './pedido/pedido.module';
import { EntradaModule } from './entrada/entrada.module';
import { SalidaModule } from './salida/salida.module';
import { DetalleEntradaModule } from './detalle-entrada/detalle-entrada.module';
import { DetalleSalidaModule } from './detalle-salida/detalle-salida.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'stock_user',
      password: process.env.DB_PASSWORD || 'stock_password',
      database: process.env.DB_DATABASE || 'control_stock_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
=======
import { SalidaModule } from './salida/salida.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
>>>>>>> Stashed changes
    CiudadModule,
    ProvinciaModule,
    PaisModule,
    UsuarioModule,
<<<<<<< Updated upstream
=======
    EntradaModule,
    DetalleEntradaModule,
    DetallePedidoModule,
    DetalleSalidaModule,
    PedidoModule,
>>>>>>> Stashed changes
    CategoriaModule,
    ProductoModule,
    MarcaModule,
    ProveedorModule,
<<<<<<< Updated upstream
    PedidoModule,
    EntradaModule,
    SalidaModule,
    DetalleEntradaModule,
    DetalleSalidaModule,
    DetallePedidoModule,
=======
    SalidaModule,
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
