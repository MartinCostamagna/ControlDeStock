import {IsNotEmpty, IsString, MaxLength, IsNumber, IsInt} from 'class-validator';

export class CreateCiudadDto {
    @IsNotEmpty({ message: 'El nombre de la ciudad no puede estar vacío.' })
    @IsString({ message: 'El nombre de la ciudad debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre de la ciudad no debe exceder los 50 caracteres.' })
    nombre!: string;

    @IsNotEmpty({ message: 'La latitud de la ciudad no puede estar vacío.' })
    @IsNumber({}, { message: 'La latitud de la ciudad debe ser un numero.' })
    lalitud!: number;
    
    @IsNotEmpty({ message: 'La longitud de la ciudad no puede estar vacío.' })
    @IsNumber({}, { message: 'La longitud de la ciudad debe ser un numero.' })
    longitud!: number;

    @IsNotEmpty({ message: 'El id del provincia de la ciudad no puede estar vacío.' })
    @IsInt({ message: 'El id del provincia de la ciudad debe ser un numero.' })
    idProvincia!: number;
}
