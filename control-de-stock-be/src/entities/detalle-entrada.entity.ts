//src\entities\detalle-entrada.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Entrada } from "./entrada.entity";

@Entity('detallesDeEntrada')
export class DetalleEntrada {
    @PrimaryGeneratedColumn()
    idDetalleEntrada!: number;

    @Column({type: 'int', nullable: false})
    cantidad!: number;
    
    @ManyToOne(() => Entrada, (entrada) => entrada.detallesEntrada, {nullable: false})
    @JoinColumn({name: 'idEntrada'})
    entrada!: Entrada;
    
    @ManyToOne(() => Producto, (producto) => producto.detallesEntrada, {nullable:false})
    @JoinColumn({name: 'idProducto'})
    producto: Producto;
}
