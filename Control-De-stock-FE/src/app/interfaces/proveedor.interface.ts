import { Ciudad } from "./ciudad.interface";

export interface Proveedor {
    idProveedor: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    ciudad: Ciudad;
}