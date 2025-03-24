import { Error } from "../../../../shared";

export class InvalidEmail extends Error<"InvalidEmail"> {
  constructor() {
    super("InvalidEmail");
  }
}
