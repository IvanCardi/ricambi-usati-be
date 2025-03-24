import { Error } from "../core/Error";
import { NonEmptyString } from "./NonEmptyString";
import { TextUtils } from "./TextUtils";

export class InvalidEmail extends Error<"InvalidEmail"> {
  constructor() {
    super("InvalidEmail");
  }
}

export class Email extends NonEmptyString<"Email"> {
  public constructor(email: string) {
    super(email, "Email");

    if (!TextUtils.validateEmailAddress(email)) {
      throw new InvalidEmail();
    }
  }
}
