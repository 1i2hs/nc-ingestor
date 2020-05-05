import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../logger/app-logger.module';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';

@Module({
  imports: [AppLoggerModule],
  controllers: [IngestorController],
  providers: [IngestorService],
})
export class IngestorModule {}
