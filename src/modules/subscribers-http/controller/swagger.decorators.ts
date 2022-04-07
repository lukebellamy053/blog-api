import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SubscriberEntity } from '../external';

export const GetSubscribersSwagger = applyDecorators(
  ApiOperation({ summary: 'Get registered subscribers' }),
  ApiResponse({
    status: 200,
    description: 'A list of all subscribers',
    type: [SubscriberEntity],
  }),
);

export const NewSubscriberSwagger = applyDecorators(
  ApiOperation({ summary: 'Register a new subscriber' }),
  ApiResponse({
    status: 201,
    description: 'Subscriber added',
    type: SubscriberEntity,
  }),
  ApiResponse({
    status: 400,
    description: 'Invalid fields provided',
    type: BadRequestException,
  }),
);

export const ValidateEmailSwagger = applyDecorators(
  ApiOperation({ summary: 'Confirm a users email' }),
  ApiResponse({
    status: 200,
    description: 'Email verified',
  }),
  ApiResponse({
    status: 400,
    description: 'Email and code did not match',
    type: BadRequestException,
  }),
);

export const DeleteUserSwagger = applyDecorators(
  ApiParam({ name: 'email', description: 'the email of the user to remove' }),
  ApiOperation({ summary: 'Unsubscribe a user' }),
  ApiResponse({
    status: 200,
    description:
      'Regardless of whether or not the user was removed (Dont allow any indication of whether a user exists or not)',
  }),
);
