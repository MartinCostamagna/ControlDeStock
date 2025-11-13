export interface CreateProducto {
    codigoDeBarras: number;
    descripcion: string;
    precioCosto: number;
    porcentajeGanancia: number;
    stock: number;
    stockMinimo: number;
    idMarca: number;
    idCategoria: number;
    idProveedor: number;
}