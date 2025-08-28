import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Salida } from "./salida.entity";
import { Producto } from "./producto.entity";

@Entity('detallesDeSalida')
export class DetalleSalida {
    @PrimaryGeneratedColumn()
    idDetalleSalida!: number;
    
    @Column({type: 'int', nullable: false})
    cantidad!: number;
        
    @ManyToOne(() => Salida, (salida) => salida.detallesSalida, {nullable: false})
    @JoinColumn({name: 'idSalida'})
    salida!: Salida;
        
    @ManyToOne(() => Producto, (producto) => producto.detallesSalida, {nullable:false})
    @JoinColumn({name: 'idProducto'})
    producto: Producto;
}
