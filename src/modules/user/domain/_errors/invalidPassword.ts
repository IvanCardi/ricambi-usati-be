import { Error } from "../../../../shared";

export class InvalidPassword extends Error<"InvalidPassword"> {
  constructor() {
    super("InvalidPassword");
  }
}
