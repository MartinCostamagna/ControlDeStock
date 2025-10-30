export interface CreateProducto {
    codigoDeBarras: number;
    descripcion: string;
    stock: number;
    stockMinimo: number;
    idMarca: number;
    idCategoria: number;
    idProveedor: number;
}