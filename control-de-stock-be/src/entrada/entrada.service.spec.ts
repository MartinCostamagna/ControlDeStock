import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaService } from './entrada.service';
import { Entrada } from '../entities/entrada.entity';

describe('EntradaService', () => {
  let service: EntradaService;
  let entradaRepository: Repository<Entrada>;

  const mockEntradaRepository = {
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
      providers: [
        EntradaService,
        {
          provide: getRepositoryToken(Entrada),
          useValue: mockEntradaRepository,
        },
      ],
    }).compile();

    service = module.get<EntradaService>(EntradaService);
    entradaRepository = module.get<Repository<Entrada>>(getRepositoryToken(Entrada));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
