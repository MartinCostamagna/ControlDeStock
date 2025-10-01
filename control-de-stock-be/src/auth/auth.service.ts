import { Injectable, UnauthorizedException, Logger, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterUsuarioDto } from './dto/register-usuario.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly ciudadService: CiudadService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    this.logger.debug(`Procesando login para: ${email}`);
    const usuario = await this.usuarioService.findByEmailForAuth(email);

    if (!usuario) {
      this.logger.warn(`Login fallido: Email no encontrado - ${email}`);
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const passwordIsValid = await bcrypt.compare(pass, usuario.contraseña);
    if (!passwordIsValid) {
      this.logger.warn(`Login fallido: Contraseña incorrecta para - ${email}`);
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload: JwtPayload = {
      sub: usuario.idUsuario,
      email: usuario.email,
      role: usuario.role,
    };
    this.logger.log(`Login exitoso para: ${email}. Generando token.`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUsuarioDto: RegisterUsuarioDto): Promise<{ message: string; userId?: number }> {
    this.logger.debug(`Intentando registrar nueva usuario con email: ${registerUsuarioDto.email}`);
    const { cityName, provinceName, ...usuarioData } = registerUsuarioDto;
    let cityIdToAssign: number | undefined = undefined;

    if (cityName) {
      const city = await this.ciudadService.findOneByNameAndProvinceName(cityName, provinceName);
      if (!city) {
        this.logger.warn(`Registro fallido: Ciudad '${cityName}' ${provinceName ? `en provincia '${provinceName}'` : ''} no encontrada.`);
        throw new BadRequestException(`La ciudad '${cityName}' ${provinceName ? `en la provincia '${provinceName}'` : ''} no fue encontrada. Por favor, verifique los datos o contacte al administrador si cree que debería existir.`);
      }
      cityIdToAssign = city.idCiudad;
      this.logger.log(`Ciudad encontrada para el registro: ID ${cityIdToAssign}, Nombre: ${city.nombre}`);
    }

    const createUsuarioData = {
      nombre: usuarioData.nombre,
      apellido: usuarioData.apellido,
      email: usuarioData.email,
      contraseña: usuarioData.contraseña,
      role: 'USER', // Default role
      idCiudad: cityIdToAssign,
    };

    try {
      const newUsuarioResponse = await this.usuarioService.create(createUsuarioData);
      this.logger.log(`Usuario registrado exitosamente con ID: ${newUsuarioResponse.idUsuario}`);
      return {
        message: 'Usuario registrado exitosamente.',
        userId: newUsuarioResponse.idUsuario,
      };
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        this.logger.warn(`Registro fallido: ${error.message}`);
      } else if (error instanceof Error) {
        this.logger.error(`Error durante el registro: ${error.message}`, error.stack);
      } else {
        this.logger.error('Error desconocido durante el registro.', String(error));
      }
      throw error;
    }
  }

  async validateUsuarioCredentials(email: string, pass: string): Promise<Omit<Usuario, 'contraseña'> | null> {
    const usuario = await this.usuarioService.findByEmailForAuth(email);
    if (usuario && await bcrypt.compare(pass, usuario.contraseña)) {
      const { contraseña, ...result } = usuario;
      return result as Omit<Usuario, 'contraseña'>;
    }
    return null;
  }
}
