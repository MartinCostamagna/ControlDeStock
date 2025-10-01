import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinciaService } from './provincia.service';
import { Provincia } from '../entities/provincia.entity';

describe('ProvinciaService', () => {
  let service: ProvinciaService;
  let provinciaRepository: Repository<Provincia>;

  const mockProvinciaRepository = {
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
        ProvinciaService,
        {
          provide: getRepositoryToken(Provincia),
          useValue: mockProvinciaRepository,
        },
      ],
    }).compile();

    service = module.get<ProvinciaService>(ProvinciaService);
    provinciaRepository = module.get<Repository<Provincia>>(getRepositoryToken(Provincia));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
