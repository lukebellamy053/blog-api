import {Module} from '@nestjs/common';
import {SubscribersModule} from "./modules/subscribers/subscribers.module";

@Module({
    imports: [SubscribersModule],
})
export class AppModule {
}
