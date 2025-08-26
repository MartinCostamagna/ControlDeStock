import { Test, TestingModule } from '@nestjs/testing';
import { DetalleEntradaController } from './detalle-entrada.controller';
import { DetalleEntradaService } from './detalle-entrada.service';

describe('DetalleEntradaController', () => {
  let controller: DetalleEntradaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleEntradaController],
      providers: [DetalleEntradaService],
    }).compile();

    controller = module.get<DetalleEntradaController>(DetalleEntradaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
