import { Provincia } from "./provincia.interface";

export interface Ciudad {
    idCiudad: number;
    nombre: string;
    latitud: number;
    longitud: number;
    idProvincia: number;
    provincia: Provincia;
}