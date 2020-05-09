import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IngestorService } from './ingestor.service';
import { CreateUrlDataDTO } from './dto/create-url_data.dto';
import { QueueComponent } from './lib/queue.component';
import { UrlData } from './lib/url_data.interface';
import { AppLogger } from '../logger/app-logger.service';

@Controller()
export class IngestorController {
  constructor(
    private readonly appService: IngestorService,
    private readonly queueComponent: QueueComponent,
    private appLogger: AppLogger,
  ) {}

  // TODO add Guard to protect invalid data or access
  @Post('urls')
  postUrl(@Body() createUrlDataDto: CreateUrlDataDTO): object {
    const { url, device } = createUrlDataDto;
    this.appLogger.debug(`Posted url(s): ${url}`);
    if (Array.isArray(url)) {
      this.queueComponent.enqueue(
        url.map((url: string) => ({ id: uuidv4(), url, device })),
      );
    } else {
      this.queueComponent.enqueue({ id: uuidv4(), url, device });
    }
    return {
      _message: `url(s) have been successfully queued.`,
    };
  }

  @Get('urls')
  getUrlList(): object {
    return {
      data: this.queueComponent.all(),
    };
  }

  @Get('urls/:id')
  getUrl(@Param('id') id): object {
    const urlData: UrlData = this.queueComponent.find(id);
    if (urlData) {
      return {
        data: urlData,
      };
    } else {
      return {
        _message: 'url data with given id does not exist.',
      };
    }
  }
}
