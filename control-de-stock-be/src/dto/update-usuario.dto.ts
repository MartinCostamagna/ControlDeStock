//src\dto\update-usuario.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    
    @IsOptional()
    @IsString({ message: 'La contraseña actual debe ser una cadena de texto.'})
    @MinLength(8, { message: 'La contraseña actual debe tener al menos 8 caracteres.' })
    contraseñaActual?: string;

}