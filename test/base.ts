import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { addSupport } from '../src/support';

export const getApplication = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  addSupport(app);
  await app.init();
  return app;
};
