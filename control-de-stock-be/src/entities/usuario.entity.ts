//src/entities/usuario.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Ciudad } from "./ciudad.entity";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @Column({type: 'string', nullable: false})
    apellido!: string;

    @Column({type: 'string', nullable: false})
    email!: string;

    @Column({type: 'string', nullable: false})
    @Exclude()
    contraseña!: string;

    @Column({type: 'string', nullable: false, default: 'USER'})
    role!: string;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.usuarios, {nullable: false})
    @JoinColumn({name: "idCiudad"})
    ciudad!: Ciudad
}
