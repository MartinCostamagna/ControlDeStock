import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEntradaService } from './detalle-entrada.service';
import { DetalleEntrada } from '../entities/detalle-entrada.entity';

describe('DetalleEntradaService', () => {
  let service: DetalleEntradaService;
  let detalleEntradaRepository: Repository<DetalleEntrada>;

  const mockDetalleEntradaRepository = {
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
        DetalleEntradaService,
        {
          provide: getRepositoryToken(DetalleEntrada),
          useValue: mockDetalleEntradaRepository,
        },
      ],
    }).compile();

    service = module.get<DetalleEntradaService>(DetalleEntradaService);
    detalleEntradaRepository = module.get<Repository<DetalleEntrada>>(getRepositoryToken(DetalleEntrada));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
