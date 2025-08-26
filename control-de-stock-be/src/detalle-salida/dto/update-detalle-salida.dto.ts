import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleSalidaDto } from './create-detalle-salida.dto';

export class UpdateDetalleSalidaDto extends PartialType(CreateDetalleSalidaDto) {}
