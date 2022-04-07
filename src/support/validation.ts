import { INestApplication, ValidationPipe } from '@nestjs/common';

export const applyValidation = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};
