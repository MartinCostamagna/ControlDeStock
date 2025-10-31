//src/dto/create-notificacion.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EstadoNotificacion } from '../entities/notificacion.entity';

export class CreateNotificacionDto {
    @IsNotEmpty({ message: 'El código de barras del producto es requerido.' })
    @IsString({ message: 'El código de barras debe ser una cadena de texto.' })
    codigoDeBarras!: string;

    @IsNotEmpty({ message: 'El mensaje de la notificación es requerido.' })
    @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
    mensaje!: string;

    @IsEnum(EstadoNotificacion, { message: 'El estado debe ser uno de los valores permitidos: enviada, vista, eliminada.' })
    estado?: EstadoNotificacion;
}
