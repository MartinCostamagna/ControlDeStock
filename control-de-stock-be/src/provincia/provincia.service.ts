import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';
import { CreateProvinciaDto } from '../dto/create-provincia.dto';
import { UpdateProvinciaDto } from '../dto/update-provincia.dto';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
<<<<<<< Updated upstream
    const pais = await this.paisRepository.findOneBy({ idPais: createProvinciaDto.idPais });
    if (!pais) {
      throw new BadRequestException(`El país con ID '${createProvinciaDto.idPais}' no existe.`);
    }

    const provinciaExistente = await this.provinciaRepository.findOneBy({ nombre: createProvinciaDto.nombre, pais: { idPais: createProvinciaDto.idPais } });
    if (provinciaExistente) {
      throw new BadRequestException(`La provincia '${createProvinciaDto.nombre}' ya existe en el país '${pais.nombre}'.`);
=======
    const { idPais } = createProvinciaDto;

    const pais = await this.paisRepository.findOneBy({ idPais });
    if (!pais) {
      throw new NotFoundException(`País con ID '${idPais}' no encontrado.`);
>>>>>>> Stashed changes
    }

    const nuevaProvincia = this.provinciaRepository.create({
      ...createProvinciaDto,
<<<<<<< Updated upstream
      pais: pais,
=======
      pais,
>>>>>>> Stashed changes
    });

    return this.provinciaRepository.save(nuevaProvincia);
  }

  async findAll(): Promise<Provincia[]> {
<<<<<<< Updated upstream
    return this.provinciaRepository.find({ relations: ['pais'] });
=======
    return this.provinciaRepository.find({
      relations: ['pais'],
    });
>>>>>>> Stashed changes
  }

  async findOne(id: number): Promise<Provincia> {
    const provincia = await this.provinciaRepository.findOne({
      where: { idProvincia: id },
      relations: ['pais'],
    });
    if (!provincia) {
      throw new NotFoundException(`Provincia con ID '${id}' no encontrada.`);
    }
    return provincia;
  }

  async update(id: number, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia> {
<<<<<<< Updated upstream
    const provincia = await this.provinciaRepository.findOne({
      where: { idProvincia: id },
      relations: ['pais'],
    });
    if (!provincia) {
      throw new NotFoundException(`Provincia con ID '${id}' no encontrada.`);
    }

    if (updateProvinciaDto.nombre) {
      const provinciaExistente = await this.provinciaRepository.findOneBy({
        nombre: updateProvinciaDto.nombre,
        pais: { idPais: provincia.pais.idPais },
      });
      if (provinciaExistente && provinciaExistente.idProvincia !== id) {
        throw new BadRequestException(`La provincia '${updateProvinciaDto.nombre}' ya existe en el país '${provincia.pais.nombre}'.`);
      }
    }

    const provinciaActualizada = this.provinciaRepository.merge(provincia, updateProvinciaDto);

=======
    const provincia = await this.findOne(id);

    if (updateProvinciaDto.idPais) {
      const pais = await this.paisRepository.findOneBy({ idPais: updateProvinciaDto.idPais });
      if (!pais) {
        throw new NotFoundException(`País con ID '${updateProvinciaDto.idPais}' no encontrado.`);
      }
      provincia.pais = pais;
    }

    const provinciaActualizada = this.provinciaRepository.merge(provincia, updateProvinciaDto);
>>>>>>> Stashed changes
    return this.provinciaRepository.save(provinciaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.provinciaRepository.delete(id);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    if (result.affected === 0) {
      throw new NotFoundException(`Provincia con ID '${id}' no encontrada.`);
    }
  }
}
