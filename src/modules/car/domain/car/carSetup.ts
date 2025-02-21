import { NonEmptyString } from "../../../../shared";

export class CarSetup extends NonEmptyString<"CarSetup"> {
  constructor(setup: string) {
    super(setup, "CarSetup");
  }
}
