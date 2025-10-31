export interface Proveedor {
    idProveedor: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    ciudad: {
        idCiudad: number;
        nombre: string;
        provincia: {
            idProvincia: number;
            nombre: string;
            pais: {
                idPais: number;
                nombre: string;
            }
        }
    };
}