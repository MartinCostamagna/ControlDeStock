import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { Ciudad } from '../entities/ciudad.entity';

describe('CiudadController', () => {
  let controller: CiudadController;
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
      controllers: [CiudadController],
      providers: [
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
          useValue: mockCiudadRepository,
        },
      ],
    }).compile();

    controller = module.get<CiudadController>(CiudadController);
    ciudadRepository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
