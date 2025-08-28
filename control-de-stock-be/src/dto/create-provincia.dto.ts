import {IsNotEmpty, IsString, MaxLength, IsNumber, IsInt} from 'class-validator';

export class CreateProvinciaDto {
    @IsNotEmpty({ message: 'El nombre de la provincia no puede estar vacío.' })
    @IsString({ message: 'El nombre de la provincia debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre de la provincia no debe exceder los 50 caracteres.' })
    nombre!: string;

    @IsNotEmpty({ message: 'La latitud de la provincia no puede estar vacío.' })
    @IsNumber({}, { message: 'La latitud de la provincia debe ser un numero.' })
    lalitud!: number;
    
    @IsNotEmpty({ message: 'La longitud de la provincia no puede estar vacío.' })
    @IsNumber({}, { message: 'La longitud de la provincia debe ser un numero.' })
    longitud!: number;

    @IsNotEmpty({ message: 'El id del pais de la provincia no puede estar vacío.' })
    @IsInt({ message: 'El id del pais de la provincia debe ser un numero.' })
    idPais!: number;
}
