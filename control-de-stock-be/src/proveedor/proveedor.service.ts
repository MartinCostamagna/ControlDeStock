import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const ciudad = await this.ciudadRepository.findOneBy({ idCiudad: createProveedorDto.idCiudad });
    if (!ciudad) {
      throw new BadRequestException(`La ciudad con ID '${createProveedorDto.idCiudad}' no existe.`);
    }

    const emailExistente = await this.proveedorRepository.findOneBy({ email: createProveedorDto.email });
    if (emailExistente) {
      throw new BadRequestException(`El email '${createProveedorDto.email}' ya está registrado.`);
    }

    const nuevoProveedor = this.proveedorRepository.create({
      ...createProveedorDto,
      ciudad,
    });

    return this.proveedorRepository.save(nuevoProveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      relations: ['ciudad'],
    });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { idProveedor: id },
      relations: ['ciudad'],
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: id });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }

    if (updateProveedorDto.idCiudad) {
      const ciudad = await this.ciudadRepository.findOneBy({ idCiudad: updateProveedorDto.idCiudad });
      if (!ciudad) {
        throw new BadRequestException(`La ciudad con ID '${updateProveedorDto.idCiudad}' no existe.`);
      }
      proveedor.ciudad = ciudad;
    }

    if (updateProveedorDto.email) {
      const emailExistente = await this.proveedorRepository.findOneBy({ email: updateProveedorDto.email });
      if (emailExistente && emailExistente.idProveedor !== id) {
        throw new BadRequestException(`El email '${updateProveedorDto.email}' ya está registrado.`);
      }
    }

    const proveedorActualizado = this.proveedorRepository.merge(proveedor, updateProveedorDto);
    return this.proveedorRepository.save(proveedorActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.proveedorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }
  }
}
