import { Controller, Get, Post, Body } from '@nestjs/common';
import { IngestorService } from './ingestor.service';
import { CreateUrlDataDTO } from './dto/create-url_data.dto';
import { AppLogger } from '../logger/app-logger.service';

@Controller()
export class IngestorController {
  constructor(
    private readonly appService: IngestorService,
    private appLogger: AppLogger,
  ) {}

  @Post()
  postUrl(@Body() createUrlDataDto: CreateUrlDataDTO): string {
    const { url } = createUrlDataDto;
    this.appLogger.debug(url);



    return `Given url is ${url}`;
  }
}
