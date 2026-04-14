import { IsDate, IsNotEmpty, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { CreateDetalleVentaDto } from "./create-detalle-venta.dto";

export class CreateVentaDto {
    @IsOptional()
    @IsDate({ message: "La fecha debe tener un formato válido" })
    fecha?: Date;

    @IsArray()
    @IsNotEmpty({ message: "La venta debe contener al menos un producto." })
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleVentaDto)
    detalles!: CreateDetalleVentaDto[];
}
