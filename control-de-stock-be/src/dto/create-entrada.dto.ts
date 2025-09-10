//src\dto\create-entrada.dto.ts
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateEntradaDto {
    @IsNotEmpty({message: "La fecha no puede ser nula"})
    @IsDate({message: "La fecha debe tener un formato valido"})
    fecha!: Date
}
