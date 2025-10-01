import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from '../dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from '../dto/update-detalle-pedido.dto';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
    return this.detallePedidoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido> {
    return this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.detallePedidoService.remove(id);
  }
}
