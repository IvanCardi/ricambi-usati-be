import { Error } from "../../../../shared";

export class InvalidCarYear extends Error<"InvalidCarYear"> {
  constructor() {
    super("InvalidCarYear");
  }
}
