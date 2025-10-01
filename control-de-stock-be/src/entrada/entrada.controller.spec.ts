import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';
import { Entrada } from '../entities/entrada.entity';

describe('EntradaController', () => {
  let controller: EntradaController;
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
      controllers: [EntradaController],
      providers: [
        EntradaService,
        {
          provide: getRepositoryToken(Entrada),
          useValue: mockEntradaRepository,
        },
      ],
    }).compile();

    controller = module.get<EntradaController>(EntradaController);
    entradaRepository = module.get<Repository<Entrada>>(getRepositoryToken(Entrada));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
