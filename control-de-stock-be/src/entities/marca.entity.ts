//src\entities\marca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./producto.entity";


@Entity('marcas')
export class Marca {
    @PrimaryGeneratedColumn()
    idMarca!: number;
    
    @Column({type: 'varchar', nullable: false})
    nombre!: string;
    
    @OneToMany(() => Producto, (producto) => producto.marca)
    productos!: Producto[];
}
