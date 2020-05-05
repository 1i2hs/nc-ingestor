import { Module } from '@nestjs/common';
import { IngestorModule } from './ingestor/ingestor.module';

@Module({
  imports: [IngestorModule],
})
export class AppModule {}
