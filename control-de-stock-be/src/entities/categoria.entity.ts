import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from './producto.entity'

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria!: number;

    @Column({type: 'string', nullable: false})
    nombre!: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos!: Producto[];
}
