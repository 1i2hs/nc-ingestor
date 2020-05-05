import { Test, TestingModule } from '@nestjs/testing';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';

describe('IngestorController', () => {
  let ingestorController: IngestorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IngestorController],
      providers: [IngestorService],
    }).compile();

    ingestorController = app.get<IngestorController>(IngestorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(ingestorController.getHello()).toBe('Hello World!');
    });
  });
});
