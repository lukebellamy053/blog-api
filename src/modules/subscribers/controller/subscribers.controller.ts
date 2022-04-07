import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SubscribersService } from '../service/subscribers.service';
import { NewSubscriber, SubscriberEntity } from '../entity/subscriber.entity';
import { NewSubscriberRequest } from '../request/NewSubscriberRequest';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyEmailRequest } from '../request/VerifyEmailRequest';
import { SQLErrorsInterceptor } from '../interceptors/SQLErrors.interceptor';

@Controller({ path: '/subscribers' })
export class SubscribersController {
  @Inject()
  private subscriberService: SubscribersService;

  @Get()
  @ApiOperation({ summary: 'Get registered subscribers' })
  @ApiResponse({
    type: [SubscriberEntity],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  getSubscribers(): Promise<SubscriberEntity[]> {
    return this.subscriberService.getSubscribers();
  }

  @Post()
  @ApiOperation({ summary: 'Register a new subscriber' })
  @UseInterceptors(SQLErrorsInterceptor)
  newSubscriber(
    @Body() newSubscriber: NewSubscriberRequest,
  ): Promise<SubscriberEntity> {
    return this.subscriberService.newSubscriber(newSubscriber);
  }

  @Patch()
  @ApiOperation({ summary: 'Validate a users email' })
  verifyEmail(@Body() { email, code }: VerifyEmailRequest): Promise<void> {
    return this.subscriberService.verifyEmail(email, code);
  }

  @Delete('/:email')
  @ApiOperation({ summary: 'Unsubscribe a user' })
  removeSubscriber(@Param('email') email: string): Promise<void> {
    return this.subscriberService.removeSubscriber(email);
  }
}
