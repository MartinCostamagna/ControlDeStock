import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";
import { Producto } from "./producto.entity";

@Entity("detallesVenta")
export class DetalleVenta {
    @PrimaryGeneratedColumn()
    idDetalleVenta!: number;

    @Column({ type: 'decimal', nullable: false })
    cantidad!: number;

    @Column({ type: 'decimal', nullable: false })
    precioUnitario!: number;

    @Column({ type: 'decimal', nullable: false })
    subtotal!: number;

    @ManyToOne(() => Venta, (venta) => venta.detallesVenta)
    @JoinColumn({ name: 'idVenta' })
    venta?: Venta;

    @ManyToOne(() => Producto, (producto) => producto.detallesVenta)
    @JoinColumn({ name: 'codigoDeBarras' })
    producto!: Producto;
}
