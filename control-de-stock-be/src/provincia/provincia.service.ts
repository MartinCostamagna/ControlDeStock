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

    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) { }

  async create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    const { idPais } = createProvinciaDto;

    const pais = await this.paisRepository.findOneBy({ idPais });
    if (!pais) {
      throw new NotFoundException(`País con ID '${idPais}' no encontrado.`);
    }

    const nuevaProvincia = this.provinciaRepository.create({
      ...createProvinciaDto,
      pais,
    });

    return this.provinciaRepository.save(nuevaProvincia);
  }

  async findAll(): Promise<Provincia[]> {
    return this.provinciaRepository.find({
      relations: ['pais'],
    });
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

  async findOneByNameAndPaisId(
    name: string,
    paisId: number,
    throwError: boolean = true,
    returnNull: boolean = false
  ): Promise<Provincia | null> {
    const nombreLower = name.toLowerCase();
    const provincia = await this.provinciaRepository
      .createQueryBuilder('provincia')
      .where('LOWER(provincia.nombre) = :nombre', { nombre: nombreLower })
      .andWhere('provincia.paisId = :paisId', { paisId })
      .getOne();
    if (!provincia && throwError) {
      throw new NotFoundException(`Provincia con nombre '${name}' no encontrada en el país ${paisId}.`);
    }
    if (!provincia && returnNull) {
      return null;
    }
    return provincia || null;
  }

  async findByPaisId(idPais: number): Promise<Provincia[]> {
    const provincias = await this.provinciaRepository.find({
      where: { idPais: idPais },
      order: { nombre: 'ASC' },
    });
    if (!provincias || provincias.length === 0) {
      return [];
    }
    return provincias;
  }

  async update(id: number, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia> {
    const provincia = await this.findOne(id);

    if (updateProvinciaDto.idPais) {
      const pais = await this.paisRepository.findOneBy({ idPais: updateProvinciaDto.idPais });
      if (!pais) {
        throw new NotFoundException(`País con ID '${updateProvinciaDto.idPais}' no encontrado.`);
      }
      provincia.pais = pais;
    }

    const provinciaActualizada = this.provinciaRepository.merge(provincia, updateProvinciaDto);
    return this.provinciaRepository.save(provinciaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.provinciaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Provincia con ID '${id}' no encontrada.`);
    }
  }
}
