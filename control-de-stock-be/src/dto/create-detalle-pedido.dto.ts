//src\dto\create-detalle-pedido.dto.ts
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDetallePedidoDto {
    @IsNotEmpty({ message: "La cantidad no debe ser nula" })
    @IsInt({ message: "La cantidad debe ser un entero" })
    cantidad!: number

    @IsNotEmpty({ message: "El pedido no debe ser nulo" })
    @IsInt({ message: "El id del pedido debe ser un entero" })
    idPedido!: number

    @IsNotEmpty({ message: "El producto no debe ser nulo" })
    @IsString({ message: "El id del producto debe ser una cadena de texto" })
    idProducto!: string
}
