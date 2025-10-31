//src/entities/notificacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Producto } from './producto.entity';

export enum EstadoNotificacion {
  ENVIADA = 'enviada',
  VISTA = 'vista',
  ELIMINADA = 'eliminada'
}

@Entity('notificaciones')
export class Notificacion {
    @PrimaryGeneratedColumn()
    idNotificacion!: number;

    @Column({ type: 'enum', enum: EstadoNotificacion, default: EstadoNotificacion.ENVIADA })
    estado!: EstadoNotificacion;

    @ManyToOne(() => Producto, { nullable: false })
    @JoinColumn({ name: 'codigoDeBarras' })
    producto!: Producto;

    @Column({ type: 'varchar', nullable: false })
    mensaje!: string;

    @CreateDateColumn()
    fechaHora!: Date;
}
