import { Test, TestingModule } from '@nestjs/testing';
import { PostProcessorController } from './post-processor.controller';

describe('PostProcessorController', () => {
  let controller: PostProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostProcessorController],
    }).compile();

    controller = module.get<PostProcessorController>(PostProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
