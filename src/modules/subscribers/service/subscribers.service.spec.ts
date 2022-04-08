import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersService } from './subscribers.service';
import { Frequency, SubscriberEntity } from '../entity/subscriber.entity';
import { Repository } from 'typeorm';
import Mocked = jest.Mocked;

describe('SubscribersService', () => {
  let subscriberService: SubscribersService;
  let subscriberRepo: Mocked<Repository<SubscriberEntity>>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribersService,
        {
          provide: `${SubscriberEntity.name}Repository`,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    subscriberService = await app.resolve(SubscribersService);
    subscriberRepo = await app.resolve('SubscriberEntityRepository');
  });

  it('Returns all subscribers', () => {
    const expected = [
      {
        id: 1,
        country: 'GB',
        name: 'Phill',
        email: 'example',
        emailVerified: true,
        verificationCode: null,
        frequency: Frequency.Daily,
        subscriptionTime: new Date(),
      },
    ];
    subscriberRepo.find.mockResolvedValueOnce(expected);

    expect(subscriberService.getSubscribers()).resolves.toEqual(expected);
  });

  it('Adds a new subscriber', () => {
    const expected = {
      country: 'GB',
      name: 'Phill',
      email: 'example',
      emailVerified: true,
      frequency: Frequency.Daily,
      subscriptionTime: new Date(),
    };
    subscriberRepo.findOne.mockResolvedValueOnce({
      ...expected,
      verificationCode: null,
      id: 1,
    });

    expect(subscriberService.newSubscriber(expected)).resolves.toEqual(
      expected,
    );
    expect(subscriberRepo.insert).toBeCalledWith([
      expect.objectContaining(expected),
    ]);
  });

  it('Verifies an email', async () => {
    subscriberRepo.findOne.mockResolvedValueOnce({
      email: 'example',
      verificationCode: '123456',
    } as SubscriberEntity);
    await subscriberService.verifyEmail('example', '123456');
    expect(subscriberRepo.save).toBeCalledWith([
      expect.objectContaining({ emailVerified: true, verificationCode: null }),
    ]);
  });
});
