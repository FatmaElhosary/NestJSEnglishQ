import { Test, TestingModule } from '@nestjs/testing';
import { ParagraphController } from './paragraph.controller';

describe('ParagraphController', () => {
  let controller: ParagraphController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParagraphController],
    }).compile();

    controller = module.get<ParagraphController>(ParagraphController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
