import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSalidaService } from './detalle-salida.service';

describe('DetalleSalidaService', () => {
  let service: DetalleSalidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleSalidaService],
    }).compile();

    service = module.get<DetalleSalidaService>(DetalleSalidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
