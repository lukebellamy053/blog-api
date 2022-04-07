import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { addSupport } from './support';

const logger = new Logger('Root');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  addSupport(app);

  await app.listen(3000);

  logger.log(`Listening on port 3000`);
}

bootstrap().catch((err) => {
  logger.error('Failed to start application', err);
});
