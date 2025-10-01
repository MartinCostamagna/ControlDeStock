import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Pedido } from '../entities/pedido.entity';
import { Producto } from '../entities/producto.entity';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedidoController } from './detalle-pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallePedido, Pedido, Producto])
  ],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
})
export class DetallePedidoModule {}
