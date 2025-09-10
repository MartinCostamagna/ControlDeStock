//src\entities\salida.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleSalida } from "./detalle-salida.entity";

@Entity('salidas')
export class Salida {
    @PrimaryGeneratedColumn()
    idSalida!: number;
        
    @Column({type: 'date', nullable: false})
    fecha!: Date;
    
    @OneToMany(() => DetalleSalida, (detalleSalida) => detalleSalida.salida)
    detallesSalida: DetalleSalida[];
}
