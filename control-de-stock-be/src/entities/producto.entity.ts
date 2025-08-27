import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Marca } from './marca.entity'
import { Categoria } from './categoria.entity'
import { Proveedor } from './proveedor.entity'
import { DetallePedido } from "./detalle-pedido.entity";
import { DetalleEntrada } from "./detalle-entrada.entity";

@Entity('productos')
export class Producto {
    @PrimaryColumn()
    codigoDeBarras!: number;

    @Column({type: 'string', nullable: false})
    descripcion!: string;

    @Column({type: 'int', nullable: false, default: 0})
    stock!: number;

    @Column({type: 'int', nullable: false})
    stockMinimo!: number;

    @ManyToOne(() => Marca, (marca) => marca.productos)
    @JoinColumn({name: 'idMarca'})
    marca!: Marca;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({name: 'idCategoria'})
    categoria!: Categoria;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
    @JoinColumn({name: 'idProveedor'})
    proveedor!: Proveedor;

    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.producto)
    detallesPedidos!: DetallePedido[]

    @OneToMany(() => DetalleEntrada, (detalleEntrada) => detalleEntrada.producto)
    detallesEntrada!: DetalleEntrada[]
}
