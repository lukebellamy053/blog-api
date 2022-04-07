import { Module } from '@nestjs/common';
import { SubscribersModule } from './external';
import { SubscribersController } from './controller/subscribers.controller';

@Module({
  controllers: [SubscribersController],
  imports: [SubscribersModule],
})
export class SubscribersHttpModule {}
