import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { Pais } from '../entities/pais.entity';

describe('PaisController', () => {
  let controller: PaisController;
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
      controllers: [PaisController],
      providers: [
        PaisService,
        {
          provide: getRepositoryToken(Pais),
          useValue: mockPaisRepository,
        },
      ],
    }).compile();

    controller = module.get<PaisController>(PaisController);
    paisRepository = module.get<Repository<Pais>>(getRepositoryToken(Pais));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
