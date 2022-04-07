import { BadRequestException } from '@nestjs/common';

export class DuplicateUserException extends BadRequestException {
  constructor() {
    super(undefined, `A user with the email provided already exists`);
  }
}
