import { applySwagger } from './swagger';
import { applyValidation } from './validation';
import { INestApplication } from '@nestjs/common';

const isTest = Boolean(process.env.NODE_CONFIG__IS_TEST);

export const addSupport = (app: INestApplication) => {
  if (!isTest) applySwagger(app);
  applyValidation(app);
};
