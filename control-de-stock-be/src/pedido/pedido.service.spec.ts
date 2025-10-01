import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoService } from './pedido.service';
import { Pedido } from '../entities/pedido.entity';

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepository: Repository<Pedido>;

  const mockPedidoRepository = {
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
        PedidoService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: mockPedidoRepository,
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    pedidoRepository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
