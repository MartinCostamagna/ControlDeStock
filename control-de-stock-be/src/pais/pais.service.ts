import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from '../entities/pais.entity';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { UpdatePaisDto } from '../dto/update-pais.dto';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
<<<<<<< Updated upstream
    const nombreExistente = await this.paisRepository.findOneBy({ nombre: createPaisDto.nombre });
    if (nombreExistente) {
=======
    const nombre = createPaisDto.nombre.toLowerCase();
    const paisExistente = await this.paisRepository
      .createQueryBuilder('pais')
      .where('LOWER(pais.nombre) = :nombre', { nombre })
      .getOne();

    if (paisExistente) {
>>>>>>> Stashed changes
      throw new BadRequestException(`El país '${createPaisDto.nombre}' ya existe.`);
    }

    const nuevoPais = this.paisRepository.create(createPaisDto);
    return this.paisRepository.save(nuevoPais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOneBy({ idPais: id });
    if (!pais) {
      throw new NotFoundException(`País con ID '${id}' no encontrado.`);
    }
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
<<<<<<< Updated upstream
    const pais = await this.paisRepository.findOneBy({ idPais: id });
    if (!pais) {
      throw new NotFoundException(`País con ID '${id}' no encontrado.`);
    }

    if (updatePaisDto.nombre) {
      const nombreExistente = await this.paisRepository.findOneBy({ nombre: updatePaisDto.nombre });
      if (nombreExistente && nombreExistente.idPais !== id) {
        throw new BadRequestException(`El país '${updatePaisDto.nombre}' ya existe.`);
      }
    }

    const paisActualizado = this.paisRepository.merge(pais, updatePaisDto);
=======
    const pais = await this.findOne(id);

    const paisActualizado = this.paisRepository.merge(pais, updatePaisDto);

>>>>>>> Stashed changes
    return this.paisRepository.save(paisActualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paisRepository.delete(id);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    if (result.affected === 0) {
      throw new NotFoundException(`País con ID '${id}' no encontrado.`);
    }
  }
}
