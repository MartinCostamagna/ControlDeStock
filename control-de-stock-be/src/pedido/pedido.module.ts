import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Proveedor } from '../entities/proveedor.entity';
<<<<<<< Updated upstream
import { DetallePedido } from '../entities/detalle-pedido.entity';
=======
>>>>>>> Stashed changes
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
<<<<<<< Updated upstream
  imports: [TypeOrmModule.forFeature([Pedido, Proveedor, DetallePedido])],
=======
  imports: [
    TypeOrmModule.forFeature([Pedido, Proveedor])
  ],
>>>>>>> Stashed changes
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
