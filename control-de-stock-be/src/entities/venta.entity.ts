import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleVenta } from "./detalle-venta.entity";

@Entity("ventas")
export class Venta {
    @PrimaryGeneratedColumn()
    idVenta!: number;

    @Column({ type: 'date', nullable: false })
    fecha!: Date;

    @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
    detallesVenta!: DetalleVenta[];
}
