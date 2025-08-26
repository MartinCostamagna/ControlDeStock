import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { City } from '../entities/city.entity';
import * as bcrypt from 'bcrypt';

export enum UsuarioRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password!: string;

  @Column({ type: 'date', nullable: true })
  birthDate!: Date | null;

  @Column({
    type: 'enum',
    enum: UsuarioRole,
    default: UsuarioRole.USER,
    nullable: false,
  })
  role!: UsuarioRole;

  @ManyToOne(() => City, (city) => city.usuarios, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: false,
  })
  @JoinColumn({ name: 'cityId' })
  city!: City | null;

  @Column({ type: 'int', name: 'cityId', nullable: true })
  cityId!: number | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (
      this.password &&
      (this.password.length < 50 || !this.password.startsWith('$2b$'))
    ) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
