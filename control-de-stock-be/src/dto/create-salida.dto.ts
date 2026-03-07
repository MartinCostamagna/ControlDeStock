//src\dto\create-salida.dto.ts
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, ValidateNested, IsOptional } from "class-validator";
import { CreateDetalleSalidaDto } from "./create-detalle-salida.dto";

export class CreateSalidaDto {
    @IsOptional()
    @IsDate({ message: "La fecha debe tener un formato valido" })
    fecha?: Date

    @IsNotEmpty({ message: "El motivo de la salida es obligatorio" })
    @IsString({ message: "El motivo debe ser una cadena de texto" })
    motivo!: string;

    @IsNotEmpty({ message: "La salida debe contener al menos un producto." })
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleSalidaDto)
    detalles: CreateDetalleSalidaDto[];
}
