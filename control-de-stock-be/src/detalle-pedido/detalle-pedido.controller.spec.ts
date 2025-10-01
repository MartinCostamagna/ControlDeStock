import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedido } from '../entities/detalle-pedido.entity';

describe('DetallePedidoController', () => {
  let controller: DetallePedidoController;
  let detallePedidoRepository: Repository<DetallePedido>;

  const mockDetallePedidoRepository = {
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
      controllers: [DetallePedidoController],
      providers: [
        DetallePedidoService,
        {
          provide: getRepositoryToken(DetallePedido),
          useValue: mockDetallePedidoRepository,
        },
      ],
    }).compile();

    controller = module.get<DetallePedidoController>(DetallePedidoController);
    detallePedidoRepository = module.get<Repository<DetallePedido>>(getRepositoryToken(DetallePedido));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
