//src/entities/usuario.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Ciudad } from "./ciudad.entity";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario!: number;

    @Column({type: 'varchar', nullable: false})
    nombre!: string;

    @Column({type: 'varchar', nullable: false})
    apellido!: string;

    @Column({type: 'varchar', nullable: false})
    email!: string;

    @Column({type: 'varchar', nullable: false})
    @Exclude()
    contraseña!: string;

    @Column({type: 'varchar', nullable: false, default: 'USER'})
    role!: string;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.usuarios, {nullable: false})
    @JoinColumn({name: "idCiudad"})
    ciudad!: Ciudad
}
