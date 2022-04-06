import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SubscriberEntity} from "../entity/subscriber.entity";
import {Repository} from "typeorm";

@Injectable()
export class SubscribersService {

    @InjectRepository(SubscriberEntity)
    private usersRepository: Repository<SubscriberEntity>;

    newSubscriber(subscriber: Partial<SubscriberEntity>) {
        const sub = new SubscriberEntity();
        Object.assign(sub, subscriber);
        return this.usersRepository.save([sub]);
    }

    async getSubscribers() {
        await this.newSubscriber({firstName: "Luke", lastName: "Bellamy", email: "test@test.com"})
        return this.usersRepository.find()
    }

}
