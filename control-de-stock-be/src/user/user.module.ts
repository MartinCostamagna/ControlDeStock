// src/usuario/usuario.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { City } from '../entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, City]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule.forFeature([Usuario])],
})
export class UsuariosModule {}
