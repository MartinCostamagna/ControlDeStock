import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Provincia } from "./provincia.entity";

@Entity('paises')
export class Pais {
    @PrimaryGeneratedColumn()
    isPais!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @OneToMany(() => Provincia, (provincia) => provincia.pais)
    provincias!: Provincia[];
}
