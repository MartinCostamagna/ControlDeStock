//src\dto\create-proveedor.dto.ts
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsInt  } from "class-validator";

export class CreateProveedorDto {

    @IsNotEmpty({ message: 'El nombre del proveedor no puede estar vacío.' })
    @IsString({ message: 'El nombre del proveedor debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre del proveedor no debe exceder los 50 caracteres.' })
    nombre!: string;

    @IsNotEmpty({ message: 'La dirección del proveedor no puede estar vacía.' })
    @IsString({ message: 'La dirección del proveedor debe ser una cadena de texto.' })
    @MaxLength(60, { message: 'La dirección del proveedor no debe exceder los 60 caracteres.' })
    direccion!: string;

    @IsNotEmpty({ message: 'El número telefono de teléfono es requerido' })
    @IsString({ message: 'El numero de teléfono debe ser una cadena de texto.' })
    @MaxLength(15, { message: 'La número de teléfono no debe exceder los 15 caracteres.' })
    telefono!: string;

    @IsString({ message: 'El email debe ser una cadena de texto.' })
    @IsEmail({}, {message: 'El email debe cumplir el formato de email'})
    email!: string

    @IsNotEmpty({ message: 'El ID de la ciudad es requerido.' })
    @IsInt({ message: 'El ID de la ciudad debe ser un número entero.' })
    idCiudad!: number;

}
