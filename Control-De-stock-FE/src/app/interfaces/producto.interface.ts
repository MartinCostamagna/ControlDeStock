export interface Producto {
    codigoDeBarras: number;
    descripcion: string;
    stock: number;
    stockMinimo: number;
    idMarca: number;
    idCategoria: number;
    idProveedor: number;
    marca: { idMarca: number; nombre: string; };
    categoria: { idCategoria: number; nombre: string; };
    proveedor: { idProveedor: number; nombre: string; };
}
