import { Test, TestingModule } from '@nestjs/testing';
import { MovementationController } from './movementation.controller';

describe('MovementationController', () => {
  let controller: MovementationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementationController],
    }).compile();

    controller = module.get<MovementationController>(MovementationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
