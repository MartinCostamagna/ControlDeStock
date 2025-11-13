import { IsDecimal, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateDetalleVentaDto {
    @IsNotEmpty({ message: 'La cantidad es requerida.' })
    @IsNumber({}, { message: 'La cantidad debe ser un número.' })
    @IsPositive({ message: 'La cantidad debe ser positiva.' })
    cantidad!: number;

    @IsNotEmpty({ message: 'El precio unitario es requerido.' })
    @IsNumber({}, { message: 'El precio unitario debe ser un número.' })
    @IsPositive({ message: 'El precio unitario debe ser positivo.' })
    precioUnitario!: number;

    @IsNumber({}, { message: 'El subtotal debe ser un número.' })
    subtotal!: number;

    @IsNotEmpty({ message: 'El ID de la venta es requerido.' })
    @IsNumber({}, { message: 'El ID de la venta debe ser un número.' })
    idVenta!: number;

    @IsNotEmpty({ message: 'El ID del producto es requerido.' })
    @IsNumber({}, { message: 'El ID del producto debe ser un número.' })
    idProducto!: number;
}
