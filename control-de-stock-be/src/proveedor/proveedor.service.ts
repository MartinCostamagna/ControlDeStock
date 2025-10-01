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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
<<<<<<< Updated upstream
    const ciudad = await this.ciudadRepository.findOneBy({ idCiudad: createProveedorDto.idCiudad });
    if (!ciudad) {
      throw new BadRequestException(`La ciudad con ID '${createProveedorDto.idCiudad}' no existe.`);
    }

    const emailExistente = await this.proveedorRepository.findOneBy({ email: createProveedorDto.email });
    if (emailExistente) {
      throw new BadRequestException(`El email '${createProveedorDto.email}' ya está registrado.`);
=======
    const { idCiudad } = createProveedorDto;

    const ciudad = await this.ciudadRepository.findOneBy({ idCiudad });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID '${idCiudad}' no encontrada.`);
>>>>>>> Stashed changes
    }

    const nuevoProveedor = this.proveedorRepository.create({
      ...createProveedorDto,
      ciudad,
    });

    return this.proveedorRepository.save(nuevoProveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
<<<<<<< Updated upstream
      relations: ['ciudad'],
=======
      relations: ['ciudad', 'productos', 'pedidos'],
>>>>>>> Stashed changes
    });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { idProveedor: id },
<<<<<<< Updated upstream
      relations: ['ciudad'],
=======
      relations: ['ciudad', 'productos', 'pedidos'],
>>>>>>> Stashed changes
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
<<<<<<< Updated upstream
    const proveedor = await this.proveedorRepository.findOneBy({ idProveedor: id });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }
=======
    const proveedor = await this.findOne(id);
>>>>>>> Stashed changes

    if (updateProveedorDto.idCiudad) {
      const ciudad = await this.ciudadRepository.findOneBy({ idCiudad: updateProveedorDto.idCiudad });
      if (!ciudad) {
<<<<<<< Updated upstream
        throw new BadRequestException(`La ciudad con ID '${updateProveedorDto.idCiudad}' no existe.`);
=======
        throw new NotFoundException(`Ciudad con ID '${updateProveedorDto.idCiudad}' no encontrada.`);
>>>>>>> Stashed changes
      }
      proveedor.ciudad = ciudad;
    }

<<<<<<< Updated upstream
    if (updateProveedorDto.email) {
      const emailExistente = await this.proveedorRepository.findOneBy({ email: updateProveedorDto.email });
      if (emailExistente && emailExistente.idProveedor !== id) {
        throw new BadRequestException(`El email '${updateProveedorDto.email}' ya está registrado.`);
      }
    }

=======
>>>>>>> Stashed changes
    const proveedorActualizado = this.proveedorRepository.merge(proveedor, updateProveedorDto);
    return this.proveedorRepository.save(proveedorActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.proveedorRepository.delete(id);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado.`);
    }
  }
}
