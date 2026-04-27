import { Producto } from './producto.interface';

export enum EstadoNotificacion {
    ENVIADA = 'enviada',
    VISTA = 'vista',
    ELIMINADA = 'eliminada'
}

export interface Notificacion {
    idNotificacion: number;
    estado: EstadoNotificacion;
    mensaje: string;
    fechaHora: Date;
    producto: Producto;
}