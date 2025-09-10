//src\entities\provincia.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pais } from "./pais.entity";
import { Ciudad } from "./ciudad.entity";

@Entity('provincias')
export class Provincia {
    @PrimaryGeneratedColumn()
    idProvincia!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @Column({ type: 'double precision', nullable: false })
    latitud!: number;

    @Column({ type: 'double precision', nullable: false })
    longitud!: number;

    @ManyToOne(() => Pais, (pais) => pais.provincias, {nullable: false})
    @JoinColumn({name: 'idPais'})
    pais!: Pais;

    @OneToMany(() => Ciudad, (ciudad) => ciudad.provincia)
    ciudades!: Ciudad[];
}
