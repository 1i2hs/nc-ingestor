import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';

// import { AppLogger} from "./app-logger.service";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(helmet());
  app.enableCors();
  // app.useLogger(new AppLogger())

  await app.listen(3000);
}
bootstrap();
