import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoService } from './producto.service';
import { Producto } from '../entities/producto.entity';

describe('ProductoService', () => {
  let service: ProductoService;
  let productoRepository: Repository<Producto>;

  const mockProductoRepository = {
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
        ProductoService,
        {
          provide: getRepositoryToken(Producto),
          useValue: mockProductoRepository,
        },
      ],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    productoRepository = module.get<Repository<Producto>>(getRepositoryToken(Producto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
