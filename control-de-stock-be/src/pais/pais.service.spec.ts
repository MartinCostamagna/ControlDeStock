import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaisService } from './pais.service';
import { Pais } from '../entities/pais.entity';

describe('PaisService', () => {
  let service: PaisService;
  let paisRepository: Repository<Pais>;

  const mockPaisRepository = {
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
        PaisService,
        {
          provide: getRepositoryToken(Pais),
          useValue: mockPaisRepository,
        },
      ],
    }).compile();

    service = module.get<PaisService>(PaisService);
    paisRepository = module.get<Repository<Pais>>(getRepositoryToken(Pais));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
