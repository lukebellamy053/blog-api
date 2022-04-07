import {Frequency, NewSubscriber} from "../entity/subscriber.entity";
import {IsEmail, IsEnum, Length} from "class-validator";
import {NonEmptyString} from "./common";


export class NewSubscriberRequest implements NewSubscriber {
    @NonEmptyString({description: "The COR ISO Code for the new subscriber", examples: ["GB", "FR"]},)
    @Length(2,3)
    country: string;

    @IsEmail()
    @NonEmptyString({description: "Email address of the new subscriber"})
    email: string;

    @NonEmptyString({description: "The frequency of newsletters", examples: ["daily", "weekly", "monthly"]})
    @IsEnum(Frequency, {message: `Frequency must be one of ${Object.values(Frequency).join(", ")}`})
    frequency: Frequency;

    @NonEmptyString({description: "The subscribers full name", examples: ["John Doe"]})
    name: string;

}
