//src\dto\create-marca.dto.ts
import { IsNotEmpty , IsInt, IsString, MaxLength} from "class-validator";

export class CreateMarcaDto {
    @IsNotEmpty({ message: 'El nombre de la marca es requerido.' })
    @IsString({ message: 'El nombre de la marca debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'El nombre de la marca no debe exceder los 100 caracteres.' })
    nombre!: string;
}
