//src\entities\entrada.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleEntrada } from "./detalle-entrada.entity";

@Entity("entradas")
export class Entrada {
    @PrimaryGeneratedColumn()
    idEntrada!: number;
    
    @Column({type: 'date', nullable: false})
    fecha!: Date;

    @OneToMany(() => DetalleEntrada, (detalleEntrada) => detalleEntrada.entrada)
    detallesEntrada: DetalleEntrada[];
}
