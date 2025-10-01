import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { Pedido } from '../entities/pedido.entity';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
