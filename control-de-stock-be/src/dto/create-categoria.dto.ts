//src\dto\create-categoria.dto.ts
import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateCategoriaDto {
    @IsNotEmpty({ message: 'El nombre de la categoría no puede estar vacío.' })
    @IsString({ message: 'El nombre de la categoría debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'El nombre de la categoría no debe exceder los 100 caracteres.' })
    nombre!: string;
}