//src\categoria\categoria.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const nombre = createCategoriaDto.nombre.toLowerCase();
    const categoriaExistente = await this.categoriaRepository
    .createQueryBuilder('categoria')
    .where('LOWER(categoria.nombre) = :nombre', { nombre })
    .getOne();

    if (categoriaExistente) {
      throw new BadRequestException(`La categoría '${createCategoriaDto.nombre}' ya existe.`);
    }

    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(nuevaCategoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ idCategoria: id });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID '${id}' no encontrada.`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id); 
    
    const categoriaActualizada = this.categoriaRepository.merge(categoria, updateCategoriaDto);
    
    return this.categoriaRepository.save(categoriaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Categoría con ID '${id}' no encontrada.`);
    }
  }
}