import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSalidaService } from './detalle-salida.service';
import { DetalleSalida } from '../entities/detalle-salida.entity';

describe('DetalleSalidaService', () => {
  let service: DetalleSalidaService;
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
      providers: [
        DetalleSalidaService,
        {
          provide: getRepositoryToken(DetalleSalida),
          useValue: mockDetalleSalidaRepository,
        },
      ],
    }).compile();

    service = module.get<DetalleSalidaService>(DetalleSalidaService);
    detalleSalidaRepository = module.get<Repository<DetalleSalida>>(getRepositoryToken(DetalleSalida));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
