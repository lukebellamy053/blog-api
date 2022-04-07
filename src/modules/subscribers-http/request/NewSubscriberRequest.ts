import { IsEmail, IsEnum, Length } from 'class-validator';
import { NonEmptyString } from './common';
import { Frequency, NewSubscriber } from '../external';

export class NewSubscriberRequest implements NewSubscriber {
  @NonEmptyString({
    description: 'The COR ISO Code for the new subscriber',
    example: 'GB',
  })
  @Length(2, 3)
  country: string;

  @IsEmail()
  @NonEmptyString({
    description: 'Email address of the new subscriber',
    example: 'john.doe@test.com',
  })
  email: string;

  @NonEmptyString({
    description: 'The frequency of newsletters',
    enum: Frequency,
    example: Frequency.Daily,
  })
  @IsEnum(Frequency, {
    message: `Frequency must be one of ${Object.values(Frequency).join(', ')}`,
  })
  frequency: Frequency;

  @NonEmptyString({
    description: 'The subscribers full name',
    example: 'John Doe',
  })
  name: string;
}
