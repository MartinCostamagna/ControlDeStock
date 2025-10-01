import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from '../entities/proveedor.entity';

describe('ProveedorService', () => {
  let service: ProveedorService;
  let proveedorRepository: Repository<Proveedor>;

  const mockProveedorRepository = {
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
        ProveedorService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockProveedorRepository,
        },
      ],
    }).compile();

    service = module.get<ProveedorService>(ProveedorService);
    proveedorRepository = module.get<Repository<Proveedor>>(getRepositoryToken(Proveedor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
