import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSalidaController } from './detalle-salida.controller';
import { DetalleSalidaService } from './detalle-salida.service';
import { DetalleSalida } from '../entities/detalle-salida.entity';

describe('DetalleSalidaController', () => {
  let controller: DetalleSalidaController;
  let detalleSalidaRepository: Repository<DetalleSalida>;

  const mockDetalleSalidaRepository = {
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
      controllers: [DetalleSalidaController],
      providers: [
        DetalleSalidaService,
        {
          provide: getRepositoryToken(DetalleSalida),
          useValue: mockDetalleSalidaRepository,
        },
      ],
    }).compile();

    controller = module.get<DetalleSalidaController>(DetalleSalidaController);
    detalleSalidaRepository = module.get<Repository<DetalleSalida>>(getRepositoryToken(DetalleSalida));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
