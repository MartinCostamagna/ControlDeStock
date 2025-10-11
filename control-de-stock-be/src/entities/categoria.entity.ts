//src\entities\categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from './producto.entity'

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria!: number;

    @Column({type: 'varchar', nullable: false})
    nombre!: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos!: Producto[];
}
