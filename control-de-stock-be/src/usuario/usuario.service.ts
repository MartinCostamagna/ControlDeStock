//src/usuario/usuario.service.ts
import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Ciudad } from '../entities/ciudad.entity'; 
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const ciudad = await this.ciudadRepository.findOneBy({ idCiudad: createUsuarioDto.idCiudad });
    if (!ciudad) {
      throw new BadRequestException(`La ciudad con ID '${createUsuarioDto.idCiudad}' no existe.`);
    }

    const emailExistente = await this.usuarioRepository.findOneBy({ email: createUsuarioDto.email });
    if (emailExistente) {
      throw new BadRequestException(`El email '${createUsuarioDto.email}' ya está registrado.`);
    }
    
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      ciudad: ciudad,
    });

    const saltRounds = 10;
    nuevoUsuario.contraseña = await bcrypt.hash(createUsuarioDto.contraseña, saltRounds);
    
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario: id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID '${id}' no encontrado.`);
    }

    if (updateUsuarioDto.contraseña) {
      if (!updateUsuarioDto.contraseñaActual) {
        throw new BadRequestException('Se requiere la contraseña actual para establecer una nueva.');
      }

      const iscontraseñaMatching = await bcrypt.compare(
        updateUsuarioDto.contraseñaActual,
        usuario.contraseña,
      );

      if (!iscontraseñaMatching) {
        throw new UnauthorizedException('La contraseña actual es incorrecta.');
      }

      const saltRounds = 10;
      usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, saltRounds);
    }
    
    delete updateUsuarioDto.contraseñaActual;

    const usuarioActualizado = this.usuarioRepository.merge(usuario, updateUsuarioDto);
    
    return this.usuarioRepository.save(usuarioActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID '${id}' no encontrado.`);
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario: id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID '${id}' no encontrado.`);
    }
    return usuario;
  }
}