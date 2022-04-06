import {Injectable} from "@nestjs/common";

@Injectable()
export class SubscribersService {

    getSubscribers() {
        return [
            {
                id: 1,
                name: "Tom",
                email: "example.com",
                emailVerified: false
            }
        ]
    }

}
