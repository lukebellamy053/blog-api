import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewSubscriber, SubscriberEntity } from '../entity/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService {
  @InjectRepository(SubscriberEntity)
  private usersRepository: Repository<SubscriberEntity>;

  async verifyEmail(email: string, verificationCode: string) {
    const subscriber = await this.usersRepository.findOne({ email });
    if (!subscriber || subscriber.verificationCode !== verificationCode) {
      // For security reasons, don't reveal if the user does not exist
      throw new BadRequestException(
        'The verification code provided does not match',
      );
    }
    subscriber.emailVerified = true;
    subscriber.verificationCode = null;
    await this.usersRepository.save([subscriber]);
  }

  async newSubscriber(subscriber: NewSubscriber) {
    const sub = new SubscriberEntity();
    Object.assign(sub, subscriber);
    const currentTimestamp = Date.now().toString();
    sub.verificationCode = currentTimestamp.substring(
      currentTimestamp.length - 6,
    );
    await this.usersRepository.insert([sub]);

    return this.usersRepository.findOne({ email: sub.email });
  }

  async getSubscribers(): Promise<SubscriberEntity[]> {
    return this.usersRepository.find();
  }

  async removeSubscriber(email: string) {
    await this.usersRepository.delete({ email });
  }
}
