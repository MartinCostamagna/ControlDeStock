import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';
import { Salida } from '../entities/salida.entity';

describe('SalidaController', () => {
  let controller: SalidaController;
  let salidaRepository: Repository<Salida>;

  const mockSalidaRepository = {
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
      controllers: [SalidaController],
      providers: [
        SalidaService,
        {
          provide: getRepositoryToken(Salida),
          useValue: mockSalidaRepository,
        },
      ],
    }).compile();

    controller = module.get<SalidaController>(SalidaController);
    salidaRepository = module.get<Repository<Salida>>(getRepositoryToken(Salida));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
