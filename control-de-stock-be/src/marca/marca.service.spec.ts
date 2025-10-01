import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcaService } from './marca.service';
import { Marca } from '../entities/marca.entity';

describe('MarcaService', () => {
  let service: MarcaService;
  let marcaRepository: Repository<Marca>;

  const mockMarcaRepository = {
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
        MarcaService,
        {
          provide: getRepositoryToken(Marca),
          useValue: mockMarcaRepository,
        },
      ],
    }).compile();

    service = module.get<MarcaService>(MarcaService);
    marcaRepository = module.get<Repository<Marca>>(getRepositoryToken(Marca));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
