import { Injectable } from '@nestjs/common';
import { CreateDetalleSalidaDto } from '../dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from '../dto/update-detalle-salida.dto';

@Injectable()
export class DetalleSalidaService {
  create(createDetalleSalidaDto: CreateDetalleSalidaDto) {
    return 'This action adds a new detalleSalida';
  }

  findAll() {
    return `This action returns all detalleSalida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleSalida`;
  }

  update(id: number, updateDetalleSalidaDto: UpdateDetalleSalidaDto) {
    return `This action updates a #${id} detalleSalida`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleSalida`;
  }
}
