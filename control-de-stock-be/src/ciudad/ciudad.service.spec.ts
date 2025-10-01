import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadService } from './ciudad.service';
import { Ciudad } from '../entities/ciudad.entity';

describe('CiudadService', () => {
  let service: CiudadService;
  let ciudadRepository: Repository<Ciudad>;

  const mockCiudadRepository = {
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
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
          useValue: mockCiudadRepository,
        },
      ],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    ciudadRepository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
