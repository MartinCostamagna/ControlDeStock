import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Categoria } from '../entities/categoria.entity';

describe('CategoriaController', () => {
  let controller: CategoriaController;
  let categoriaRepository: Repository<Categoria>;

  const mockCategoriaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaController],
      providers: [
        CategoriaService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: mockCategoriaRepository,
        },
      ],
    }).compile();

    controller = module.get<CategoriaController>(CategoriaController);
    categoriaRepository = module.get<Repository<Categoria>>(getRepositoryToken(Categoria));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
