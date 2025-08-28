import { IsNotEmpty, IsInt } from "class-validator"

export class CreateDetalleEntradaDto {
    @IsNotEmpty({message: "La cantidad no debe ser nula"})
    @IsInt({message: "La cantidad debe ser un entero"})
    cantidad!: number

    @IsNotEmpty({message: "La entrada no debe ser nulo"})
    @IsInt({message: "La id de la entrada debe ser un entero"})
    idEntrada!: number

    @IsNotEmpty({message: "El producto no debe ser nulo"})
    @IsInt({message: "El id del producto debe ser un entero"})
    idProducto!: number
}
