//src\dto\create-entrada.dto.ts
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateDetalleEntradaDto } from "./create-detalle-entrada.dto";

export class CreateEntradaDto {
    @IsNotEmpty({ message: "La fecha no puede ser nula" })
    @IsDate({ message: "La fecha debe tener un formato valido" })
    fecha!: Date;

    @IsNotEmpty({ message: "La entrada debe contener al menos un detalle de producto." })
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleEntradaDto)
    detalles: CreateDetalleEntradaDto[];
}
