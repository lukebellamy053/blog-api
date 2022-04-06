import {Controller, Get, Inject} from "@nestjs/common";
import {SubscribersService} from "../service/subscribers.service";

@Controller({path: "/subscribers"})
export class SubscribersController {

    @Inject()
    private subscriberService: SubscribersService;

    @Get()
    getSubscribers() {
        return this.subscriberService.getSubscribers();
    }

}
