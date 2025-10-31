import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { PaisModule } from './pais/pais.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EntradaModule } from './entrada/entrada.module';
import { DetalleEntradaModule } from './detalle-entrada/detalle-entrada.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { DetalleSalidaModule } from './detalle-salida/detalle-salida.module';
import { PedidoModule } from './pedido/pedido.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { MarcaModule } from './marca/marca.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { SalidaModule } from './salida/salida.module';
import { DataSeedingModule } from './database/data-seeding/data-seeding.module';
import { AuthModule } from './auth/auth.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CiudadModule,
    ProvinciaModule,
    PaisModule,
    UsuarioModule,
    EntradaModule,
    DetalleEntradaModule,
    DetallePedidoModule,
    DetalleSalidaModule,
    PedidoModule,
    CategoriaModule,
    ProductoModule,
    MarcaModule,
    ProveedorModule,
    SalidaModule,
    DataSeedingModule,
    AuthModule,
    NotificacionesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
