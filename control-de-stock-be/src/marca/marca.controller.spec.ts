import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcaController } from './marca.controller';
import { MarcaService } from './marca.service';
import { Marca } from '../entities/marca.entity';

describe('MarcaController', () => {
  let controller: MarcaController;
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
      controllers: [MarcaController],
      providers: [
        MarcaService,
        {
          provide: getRepositoryToken(Marca),
          useValue: mockMarcaRepository,
        },
      ],
    }).compile();

    controller = module.get<MarcaController>(MarcaController);
    marcaRepository = module.get<Repository<Marca>>(getRepositoryToken(Marca));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
