import 'dotenv/config'
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, LoggerService} from "@nestjs/common";

const logger = new Logger("Root")

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    logger.log(`Listening on port 3000`);
}

bootstrap().catch(err => {
    logger.error("Failed to start application", err);
});
