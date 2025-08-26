// src/auth/interfaces/jwt-payload.interface.ts
import { UsuarioRole } from '../../entities/usuario.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UsuarioRole;
  firstName: string;
  lastName: string;
}
