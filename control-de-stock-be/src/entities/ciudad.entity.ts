//src\entities\ciudad.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Provincia } from "./provincia.entity";

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    idCiudad!: number;

    @Column({ type: 'varchar', nullable: false })
    nombre!: string;

    @Column({ type: 'double precision', nullable: false })
    latitud!: number;

    @Column({ type: 'double precision', nullable: false })
    longitud!: number;

    @Column({ name: 'idProvincia', nullable: false })
    idProvincia!: number;

    @ManyToOne(() => Provincia, (provincia) => provincia.ciudades, { nullable: false })
    @JoinColumn({ name: 'idProvincia' })
    provincia!: Provincia;
}
