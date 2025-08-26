import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleEntradaDto } from './create-detalle-entrada.dto';

export class UpdateDetalleEntradaDto extends PartialType(CreateDetalleEntradaDto) {}
