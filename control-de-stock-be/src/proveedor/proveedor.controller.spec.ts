import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from '../entities/proveedor.entity';

describe('ProveedorController', () => {
  let controller: ProveedorController;
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
      controllers: [ProveedorController],
      providers: [
        ProveedorService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockProveedorRepository,
        },
      ],
    }).compile();

    controller = module.get<ProveedorController>(ProveedorController);
    proveedorRepository = module.get<Repository<Proveedor>>(getRepositoryToken(Proveedor));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
