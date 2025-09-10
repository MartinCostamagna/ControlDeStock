//src\dto\create-producto.dto.ts
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateProductoDto {
    @IsNotEmpty({ message: 'El código de barras es requerido.' })
    @IsInt({ message: 'El código de barras debe ser un número entero.' })
    codigoDeBarras!: string;

    @IsNotEmpty({ message: 'La descripción del producto no puede estar vacío.' })
    @IsString({ message: 'La descripción del producto debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'La descripción del producto no debe exceder los 100 caracteres.' })
    descripcion!: string;

    @IsNotEmpty({ message: 'El campo no debe estar vacío.' })
    @IsInt({ message: 'El valor debe ser un número entero.' })
    stock!: number;

    @IsNotEmpty({ message: 'El campo no debe estar vacío.' })
    @IsInt({ message: 'El valor debe ser un número entero.' })
    stockMinimo!: number;

    @IsNotEmpty({ message: 'El ID de la marca es requerido.' })
    @IsInt({ message: 'El ID de la marca debe ser un número entero.' })
    idMarca!: number;

    @IsNotEmpty({ message: 'El ID de la categoría es requerido.' })
    @IsInt({ message: 'El ID de la categoría debe ser un número entero.' })
    idCategoria!: number;

    @IsNotEmpty({ message: 'El ID del proveedor es requerido.' })
    @IsInt({ message: 'El ID del proveedor debe ser un número entero.' })
    idProveedor!: number;
}
