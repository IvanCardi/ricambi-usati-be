import { NonEmptyString, TextUtils } from "../../../../shared";
import { InvalidEmail } from "../_errors/invalidEmail";

export class Email extends NonEmptyString<"Email"> {
  public constructor(value: string) {
    super(value);

    if (!TextUtils.validateEmailAddress(value)) {
      throw new InvalidEmail();
    }
  }
}
