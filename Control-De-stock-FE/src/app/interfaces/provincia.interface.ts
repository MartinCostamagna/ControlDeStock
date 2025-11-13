import { Pais } from "./pais.interface";

export interface Provincia {
    idProvincia: number;
    nombre: string;
    latitud: number;
    longitud: number;
    idPais: number;
    pais: Pais;
}