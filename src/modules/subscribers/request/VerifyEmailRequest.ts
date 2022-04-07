import {NonEmptyString} from "./common";

export class VerifyEmailRequest {
    @NonEmptyString({description: "The email address to verify"})
    email: string;

    @NonEmptyString({description: "The 6 character code to verify the email"})
    code: string;
}
