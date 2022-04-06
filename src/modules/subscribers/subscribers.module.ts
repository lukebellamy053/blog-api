import {Module} from "@nestjs/common";
import {SubscribersController} from "./controller/subscribers.controller";
import {SubscribersService} from "./service/subscribers.service";

@Module({
    controllers: [SubscribersController],
    providers: [SubscribersService]
})
export class SubscribersModule {

}
