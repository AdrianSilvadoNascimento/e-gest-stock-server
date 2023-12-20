import { Test, TestingModule } from '@nestjs/testing';
import { MovementationService } from './movementation.service';

describe('MovementationService', () => {
  let service: MovementationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementationService],
    }).compile();

    service = module.get<MovementationService>(MovementationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
