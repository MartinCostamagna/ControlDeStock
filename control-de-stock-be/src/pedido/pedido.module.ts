import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Proveedor, DetallePedido])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
