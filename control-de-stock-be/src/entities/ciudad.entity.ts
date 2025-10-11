//src\entities\ciudad.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Provincia } from "./provincia.entity";
import { Usuario } from "./usuario.entity";
import { Proveedor } from "./proveedor.entity";

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    idCiudad!: number;
    
    @Column({type: 'varchar', nullable: false})
    nombre!: string;
    
    @Column({ type: 'double precision', nullable: false })
    latitud!: number;
    
    @Column({ type: 'double precision', nullable: false })
    longitud!: number;

    @ManyToOne(() => Provincia, (provincia) => provincia.ciudades, {nullable: false})
    @JoinColumn({name: 'idProvincia'})
    provincia!: Provincia;
    
    @OneToMany(() => Usuario, (usuario) => usuario.ciudad)
    usuarios!: Usuario[];

    @OneToMany(() => Proveedor, (proveedor) => proveedor.ciudad)
    proveedores!: Proveedor[];
}
