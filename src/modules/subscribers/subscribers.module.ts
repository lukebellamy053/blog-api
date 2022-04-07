import { Module } from '@nestjs/common';
import { SubscribersService } from './service/subscribers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './entity/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity])],
  providers: [SubscribersService],
  exports: [SubscribersService],
})
export class SubscribersModule {}
