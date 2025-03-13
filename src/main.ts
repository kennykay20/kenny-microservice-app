import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
//import * as cookieParser from 'cookie-parser';
import { config } from './config';
import { corsHandlerOption } from './middlewares/corsHandler.middleware';

async function bootstrap() {
  const PORT = config.port || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors(corsHandlerOption);
  await app.listen(PORT, () => {
    Logger.log(`Gateway-api-app running on http://localhost:${PORT}`);
  });
}
bootstrap();
