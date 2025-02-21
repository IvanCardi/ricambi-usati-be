import { NonEmptyString, TextUtils } from "../../../../shared";
import { InvalidEmail } from "../_errors/invalidEmail";

export class Email extends NonEmptyString<"Email"> {
  public constructor(email: string) {
    super(email, "Email");

    if (!TextUtils.validateEmailAddress(email)) {
      throw new InvalidEmail();
    }
  }
}
