import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Frequency, SubscriberEntity } from '../src/modules/subscribers';
import { Repository } from 'typeorm';
import {
  CREATE_SUBSCRIBER_BAD_REQUESTS,
  CREATE_SUBSCRIBER_HAPPY_PATH,
  VERIFY_EMAIL_BAD_REQUESTS,
} from './__stubs__';
import { getApplication } from './base';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<SubscriberEntity>;

  beforeAll(async () => {
    app = await getApplication();
    repo = await app.resolve('SubscriberEntityRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/subscriber (GET)', () => {
    it('Returns a list of users', async () => {
      const expected = [] as SubscriberEntity[];
      await repo.delete({});
      return request(app.getHttpServer())
        .get('/subscribers')
        .expect(200)
        .expect(expected);
    });
  });

  describe('/subscriber (POST)', () => {
    it.each(CREATE_SUBSCRIBER_BAD_REQUESTS)(
      'Rejects invalid calls - %s',
      (body) => {
        return request(app.getHttpServer())
          .post('/subscribers')
          .send(body)
          .expect(400);
      },
    );

    it.each(CREATE_SUBSCRIBER_HAPPY_PATH)(
      'Registers a new subscriber - %s',
      (body) => {
        return request(app.getHttpServer())
          .post('/subscribers')
          .send(body)
          .expect(201);
      },
    );
  });

  describe('/subscriber (PATCH)', () => {
    const stub = {
      email: 'valid@email.com',
      verificationCode: 'abcdef',
      frequency: Frequency.Weekly,
      name: 'Henry',
      country: 'GB',
      subscriptionTime: new Date(),
    };

    beforeAll(async () => {
      await repo.insert(new SubscriberEntity(stub));
    });

    it.each(VERIFY_EMAIL_BAD_REQUESTS)('Rejects invalid calls - %s', (body) => {
      return request(app.getHttpServer())
        .post('/subscribers')
        .send(body)
        .expect(400);
    });

    it('Verifies a users email', () => {
      return request(app.getHttpServer())
        .patch('/subscribers')
        .send({ email: stub.email, code: stub.verificationCode })
        .expect(200);
    });
  });

  describe('/subscriber (DELETE)', () => {
    const stub = {
      email: 'old@email.com',
      verificationCode: 'abcdef',
      frequency: Frequency.Weekly,
      name: 'Henry',
      country: 'GB',
      subscriptionTime: new Date(),
    };

    beforeAll(async () => {
      await repo.insert(new SubscriberEntity(stub));
    });

    it('Accepts deletes for users that dont exist', () => {
      return request(app.getHttpServer())
        .delete('/subscribers/notreal@email.com')
        .expect(200);
    });

    it('Deletes a user', () => {
      return request(app.getHttpServer())
        .delete(`/subscribers/${stub.email}`)
        .expect(200);
    });
  });
});
