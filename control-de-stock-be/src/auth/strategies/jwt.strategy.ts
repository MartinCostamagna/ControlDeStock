import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsuarioService } from '../../usuario/usuario.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuarioService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      console.error(
        'Error Crítico: La variable de entorno JWT_SECRET no está definida.',
      );
      throw new Error(
        'La variable de entorno JWT_SECRET no está definida. La aplicación no puede iniciar de forma segura.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => request?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    this.logger.debug(`Validando payload JWT para sub: ${payload.sub}`);

    const usuario = await this.usuariosService.findOne(payload.sub, false);
    if (!usuario) {
      this.logger.warn(
        `Validación JWT fallida: Usuarioa con ID ${payload.sub} no encontrada.`,
      );
      throw new UnauthorizedException(
        'Token inválido o la usuarioa ya no existe.',
      );
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
