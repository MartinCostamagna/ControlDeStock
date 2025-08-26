import { Test, TestingModule } from '@nestjs/testing';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';

describe('SalidaController', () => {
  let controller: SalidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalidaController],
      providers: [SalidaService],
    }).compile();

    controller = module.get<SalidaController>(SalidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
