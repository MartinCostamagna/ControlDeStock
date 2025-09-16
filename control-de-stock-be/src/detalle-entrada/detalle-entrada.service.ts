import { Injectable } from '@nestjs/common';
import { CreateDetalleEntradaDto } from '../dto/create-detalle-entrada.dto';
import { UpdateDetalleEntradaDto } from '../dto/update-detalle-entrada.dto';

@Injectable()
export class DetalleEntradaService {
  create(createDetalleEntradaDto: CreateDetalleEntradaDto) {
    return 'This action adds a new detalleEntrada';
  }

  findAll() {
    return `This action returns all detalleEntrada`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleEntrada`;
  }

  update(id: number, updateDetalleEntradaDto: UpdateDetalleEntradaDto) {
    return `This action updates a #${id} detalleEntrada`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleEntrada`;
  }
}
