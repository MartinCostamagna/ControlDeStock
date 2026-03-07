//src\dto\create-detalle-salida.dto.ts
import { IsNotEmpty, IsInt, IsString, IsOptional } from "class-validator"

export class CreateDetalleSalidaDto {
    @IsNotEmpty({ message: "La cantidad no debe ser nula" })
    @IsInt({ message: "La cantidad debe ser un entero" })
    cantidad!: number

    @IsOptional()
    @IsInt({ message: "La id de la salida debe ser un entero" })
    idSalida?: number

    @IsNotEmpty({ message: "El producto no debe ser nulo" })
    @IsString({ message: "El id del producto debe ser una cadena de texto" })
    codigoDeBarras!: string
}
