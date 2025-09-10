//src\entities\pedido.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./proveedor.entity";
import { DetallePedido } from "./detalle-pedido.entity";


@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    idPedido!: number;

    @Column({type: 'date', nullable: false})
    fecha!: Date;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.pedidos)
    @JoinColumn({name: 'idProveedor'})
    proveedor!: Proveedor;

    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
    detallesPedido!: DetallePedido[];
}
