import { Test, TestingModule } from '@nestjs/testing';
import { SalidaService } from './salida.service';

describe('SalidaService', () => {
  let service: SalidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalidaService],
    }).compile();

    service = module.get<SalidaService>(SalidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
