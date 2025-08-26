// src/usuario/dto/update-patch-usuario.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdatePatchUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto.' })
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'La nueva contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
  })
  newPassword?: string;
}
