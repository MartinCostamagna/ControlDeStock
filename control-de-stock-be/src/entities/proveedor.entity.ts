import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { City } from "./city.entity"
@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn()
    idProovedor!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @Column({type: 'string', nullable: false})
    direccion!: string;

    @Column({type: 'string', nullable: false})
    telefono!: string;

    @Column({type: 'string'})
    email!: string;

    @ManyToOne(() => City, (city) => city.proveedores)
    idCiudad!: City;


}
