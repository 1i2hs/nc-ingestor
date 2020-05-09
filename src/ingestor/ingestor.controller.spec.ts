import { Test, TestingModule } from '@nestjs/testing';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';
import { AppLoggerModule } from '../logger/app-logger.module';

import { QueueComponent } from './lib/queue.component';
import { UrlData } from './lib/url_data.interface';

describe('IngestorController', () => {
  let ingestorController: IngestorController;
  let queueComponent: QueueComponent;
  const queuedUrlList = [
    { id: '1', url: 'http://www/sample-url-1.com' },
    { id: '2', url: 'http://www/sample-url-2.com' },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppLoggerModule],
      controllers: [IngestorController],
      providers: [IngestorService, QueueComponent],
    }).compile();

    ingestorController = app.get<IngestorController>(IngestorController);
    queueComponent = app.get<QueueComponent>(QueueComponent);

    queueComponent.enqueue(queuedUrlList);
  });

  describe('ingestor', () => {
    it('should post url properly', () => {
      const url = 'http://www.sample-url.com';
      const device = 'mobile';

      expect(ingestorController.postUrl({ url, device })).toStrictEqual({
        _message: `url(s) have been successfully queued.`,
      });
    });

    it('should post url list properly', () => {
      const urlList = [
        'http://www.sample-url-1.com',
        'http://www.sample-url-2.com',
        'http://www.sample-url-3.com',
      ];
      const device = 'mobile';

      expect(
        ingestorController.postUrl({ url: urlList, device }),
      ).toStrictEqual({
        _message: `url(s) have been successfully queued.`,
      });
    });

    it('should return a url list', () => {
      expect(ingestorController.getUrlList()).toStrictEqual({
        data: queuedUrlList,
      });
    });

    it('should return a specific url with a given id', () => {
      expect(ingestorController.getUrl('1')).toStrictEqual({
        data: { id: '1', url: 'http://www/sample-url-1.com' },
      });
    });

    it('should return a message when there is no url data with a given id', () => {
      expect(ingestorController.getUrl('3')).toStrictEqual({
        _message: 'url data with given id does not exist.',
      });
    });
  });
});
