import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSalidaController } from './detalle-salida.controller';
import { DetalleSalidaService } from './detalle-salida.service';

describe('DetalleSalidaController', () => {
  let controller: DetalleSalidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleSalidaController],
      providers: [DetalleSalidaService],
    }).compile();

    controller = module.get<DetalleSalidaController>(DetalleSalidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
