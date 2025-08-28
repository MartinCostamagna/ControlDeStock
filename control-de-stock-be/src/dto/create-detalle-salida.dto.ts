import { IsNotEmpty, IsInt } from "class-validator"

export class CreateDetalleSalidaDto {
    @IsNotEmpty({message: "La cantidad no debe ser nula"})
    @IsInt({message: "La cantidad debe ser un entero"})
    cantidad!: number

    @IsNotEmpty({message: "La salida no debe ser nulo"})
    @IsInt({message: "La id de la salida debe ser un entero"})
    idSalida!: number

    @IsNotEmpty({message: "El producto no debe ser nulo"})
    @IsInt({message: "El id del producto debe ser un entero"})
    idProducto!: number    
}
