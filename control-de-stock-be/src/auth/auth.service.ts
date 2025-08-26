// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  Logger,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterUsuarioDto } from './dto/register-usuario.dto';
import { CitiesService } from '../city/city.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usuariosService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly citiesService: CitiesService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    this.logger.debug(`Procesando login para: ${email}`);
    const usuario = await this.usuariosService.findByEmailForAuth(email);

    if (!usuario) {
      this.logger.warn(`Login fallido: Email no encontrado - ${email}`);
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const passwordIsValid = await bcrypt.compare(pass, usuario.password);
    if (!passwordIsValid) {
      this.logger.warn(`Login fallido: Contraseña incorrecta para - ${email}`);
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
    };
    this.logger.log(`Login exitoso para: ${email}. Generando token.`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    registerUsuarioDto: RegisterUsuarioDto,
  ): Promise<{ message: string; userId: number }> {
    this.logger.debug(
      `Intentando registrar nueva usuarioa con email: ${registerUsuarioDto.email}`,
    );

    const { email, password, cityName, provinceName, ...usuarioData } =
      registerUsuarioDto;

    const existingUser = await this.usuariosService.findByEmailForAuth(email);
    if (existingUser) {
      this.logger.warn(`Registro fallido: El email '${email}' ya está en uso.`);
      throw new ConflictException(`El email '${email}' ya está registrado.`);
    }

    let cityIdToAssign: number | undefined = undefined;
    if (cityName) {
      const city = await this.citiesService.findOneByNameAndProvinceName(
        cityName,
        provinceName,
      );
      if (!city) {
        this.logger.warn(
          `Registro fallido: Ciudad '${cityName}' ${provinceName ? `en provincia '${provinceName}'` : ''} no encontrada.`,
        );
        throw new BadRequestException(
          `La ciudad '${cityName}' ${provinceName ? `en la provincia '${provinceName}'` : ''} no fue encontrada.`,
        );
      }
      cityIdToAssign = city.id;
      this.logger.log(
        `Ciudad encontrada para el registro: ID ${cityIdToAssign}, Nombre: ${city.name}`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    this.logger.debug(`Contraseña hasheada para el usuario ${email}`);

    try {
      const newUser = await this.usuariosService.create({
        ...usuarioData,
        email,
        password: hashedPassword, // ¡Guardamos la contraseña hasheada!
        cityId: cityIdToAssign, // Asignamos la ciudad por su ID
      });

      this.logger.log(`Usuario registrado exitosamente con ID: ${newUser.id}`);
      return {
        message: 'Usuario registrado exitosamente',
        userId: newUser.id,
      };
    } catch (error) {
      if (error instanceof Error) {
        // Si entramos aquí, TypeScript ya sabe que 'error' tiene .stack, .message, etc.
        this.logger.error(
          'Error al intentar guardar el nuevo usuario en la base de datos.',
          error.stack, // ¡El error aquí desaparecerá!
        );
      } else {
        // Si lo que se "lanzó" no fue un Error, lo logueamos de forma genérica
        this.logger.error(
          'Se produjo un error inesperado al guardar el usuario.',
          error,
        );
      }
      throw new BadRequestException(
        'No se pudo completar el registro, por favor intente de nuevo.',
      );
    }
  }

  async validateUsuarioCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<Usuario, 'password' | 'hashPassword'> | null> {
    const usuario = await this.usuariosService.findByEmailForAuth(email);
    if (usuario && (await bcrypt.compare(pass, usuario.password))) {
      const { password, hashPassword, ...result } = usuario;
      return result as Omit<Usuario, 'password' | 'hashPassword'>;
    }
    return null;
  }
}
