import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../logger/app-logger.module';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';
import { QueueComponent } from './lib/queue.component';

@Module({
  imports: [AppLoggerModule],
  controllers: [IngestorController],
  providers: [IngestorService, QueueComponent],
})
export class IngestorModule {}
