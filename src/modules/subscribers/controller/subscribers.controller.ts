import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from "@nestjs/common";
import {SubscribersService} from "../service/subscribers.service";
import {NewSubscriber} from "../entity/subscriber.entity";

@Controller({path: "/subscribers"})
export class SubscribersController {

    @Inject()
    private subscriberService: SubscribersService;

    @Get()
    getSubscribers() {
        return this.subscriberService.getSubscribers();
    }

    @Post()
    newSubscriber(@Body() newSubscriber: NewSubscriber) {
        return this.subscriberService.newSubscriber(newSubscriber)
    }

    @Patch()
    verifyEmail(@Body() {email, code}) {
        return this.subscriberService.verifyEmail(email, code);
    }

    @Delete("/:email")
    removeSubscriber(@Param("email") email: string) {
        return this.subscriberService.removeSubscriber(email);
    }

}
