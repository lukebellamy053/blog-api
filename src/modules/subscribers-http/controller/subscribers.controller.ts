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
import { NewSubscriberRequest } from '../request/NewSubscriberRequest';
import { VerifyEmailRequest } from '../request/VerifyEmailRequest';
import { SQLErrorsInterceptor } from '../interceptors/SQLErrors.interceptor';
import {
  DeleteUserSwagger,
  GetSubscribersSwagger,
  NewSubscriberSwagger,
  ValidateEmailSwagger,
} from './swagger.decorators';
import { SubscriberEntity, SubscribersService } from '../external';

@Controller({ path: '/subscribers' })
@UseInterceptors(SQLErrorsInterceptor, ClassSerializerInterceptor)
export class SubscribersController {
  @Inject()
  private subscriberService: SubscribersService;

  @Get()
  @GetSubscribersSwagger
  getSubscribers(): Promise<SubscriberEntity[]> {
    return this.subscriberService.getSubscribers();
  }

  @Post()
  @NewSubscriberSwagger
  newSubscriber(
    @Body() newSubscriber: NewSubscriberRequest,
  ): Promise<SubscriberEntity> {
    return this.subscriberService.newSubscriber(newSubscriber);
  }

  @Patch()
  @ValidateEmailSwagger
  verifyEmail(@Body() { email, code }: VerifyEmailRequest): Promise<void> {
    return this.subscriberService.verifyEmail(email, code);
  }

  @Delete('/:email')
  @DeleteUserSwagger
  removeSubscriber(@Param('email') email: string): Promise<void> {
    return this.subscriberService.removeSubscriber(email);
  }
}
