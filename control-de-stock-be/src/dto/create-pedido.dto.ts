//src\dto\create-pedido.dto.ts
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreatePedidoDto {
    @IsNotEmpty({message: "La fecha no puede ser nula"})
    @IsDate({message: "La fecha debe tener un formato valido"})
    fecha!: Date

    @IsNotEmpty({message: "El proveedor no puede ser nula"})
    @IsInt({message: "El id del proveedor debe ser un entero"})
    idProveedor!: number
}
