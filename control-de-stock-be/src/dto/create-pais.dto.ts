//src\dto\create-pais.dto.ts
import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreatePaisDto {
    @IsNotEmpty({ message: 'El nombre del país no puede estar vacío.' })
    @IsString({ message: 'El nombre del país debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre del país no debe exceder los 50 caracteres.' })
    nombre!: string;
}
