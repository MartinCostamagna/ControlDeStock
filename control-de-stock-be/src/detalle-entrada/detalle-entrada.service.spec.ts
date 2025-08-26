import { Test, TestingModule } from '@nestjs/testing';
import { DetalleEntradaService } from './detalle-entrada.service';

describe('DetalleEntradaService', () => {
  let service: DetalleEntradaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleEntradaService],
    }).compile();

    service = module.get<DetalleEntradaService>(DetalleEntradaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
