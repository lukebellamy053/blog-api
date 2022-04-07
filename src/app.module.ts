import { Module } from '@nestjs/common';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './modules/subscribers/entity/subscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [SubscriberEntity],
      synchronize: true,
    }),
    SubscribersModule,
  ],
})
export class AppModule {}
