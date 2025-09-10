//src\entities\detalle-pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Producto } from "./producto.entity";

@Entity('detallesDePedido')
export class DetallePedido {
    @PrimaryGeneratedColumn()
    idDetallePedido!: number;

    @Column({type: 'int', nullable: false})
    cantidad!: number;

    @ManyToOne(() => Pedido, (pedido) => pedido.detallesPedido)
    @JoinColumn({name: 'idPedido'})
    pedido!: Pedido;

    @ManyToOne(() => Producto, (producto) => producto.detallesPedidos)
    @JoinColumn({name: 'idProducto'})
    producto: Producto;
}
