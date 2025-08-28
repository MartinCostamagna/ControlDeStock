import { IsDate, IsNotEmpty } from "class-validator";

export class CreateSalidaDto {
    @IsNotEmpty({message: "La fecha no puede ser nula"})
    @IsDate({message: "La fecha debe tener un formato valido"})
    fecha!: Date
}
