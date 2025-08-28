import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Ciudad } from "./ciudad.entity"
import { Producto } from "./producto.entity";
import { Pedido } from "./pedido.entity";

@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn()
    idProveedor!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @Column({type: 'string'})
    direccion!: string;

    @Column({type: 'string'})
    telefono!: string;

    @Column({type: 'string'})
    email!: string;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.proveedores)
    @JoinColumn({name: 'idCiudad'})
    ciudad!: Ciudad;

    @OneToMany(() => Producto, (producto) => producto.proveedor)
    productos: Producto[]

    @OneToMany(() => Pedido, (pedido) => pedido.proveedor)
    pedidos: Pedido[]
}
