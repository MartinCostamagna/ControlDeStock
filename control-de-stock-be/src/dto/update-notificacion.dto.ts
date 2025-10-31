//src/dto/update-notificacion.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoNotificacion } from '../entities/notificacion.entity';

export class UpdateNotificacionDto {
    @IsOptional()
    @IsEnum(EstadoNotificacion, { message: 'El estado debe ser uno de los valores permitidos: enviada, vista, eliminada.' })
    estado?: EstadoNotificacion;
}
