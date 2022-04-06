import {Module} from "@nestjs/common";
import {SubscribersController} from "./controller/subscribers.controller";
import {SubscribersService} from "./service/subscribers.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriberEntity} from "./entity/subscriber.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriberEntity])
    ],
    controllers: [SubscribersController],
    providers: [SubscribersService]
})
export class SubscribersModule {

}
