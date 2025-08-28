import {IsNotEmpty, IsString, MaxLength, IsInt, IsEmail, MinLength, Matches} from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'El nombre del usuario no puede estar vacío.' })
    @IsString({ message: 'El nombre del usuario debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre del usuario no debe exceder los 50 caracteres.' })
    nombre!: string;

    @IsNotEmpty({ message: 'El apellido del usuario no puede estar vacío.' })
    @IsString({ message: 'El apellido del usuario debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El apellido del usuario no debe exceder los 50 caracteres.' })
    apellido!: string;

    @IsNotEmpty({ message: 'El mail no puede estar vacío.' })
    @IsEmail({}, {message: 'El email debe cumplir el formato de email'})
    email!: string

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.'})
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',})
    password!: string;

    @IsNotEmpty({ message: 'El ID de la ciudad es requerido.' })
    @IsInt({ message: 'El ID de la ciudad debe ser un número entero.' })
    idCiudad!: number;
}
