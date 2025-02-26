import { NonEmptyString } from "../../../../shared";

export class CarPartDescription extends NonEmptyString<"CarPartDescription"> {
  constructor(name: string) {
    super(name, "CarPartDescription");
  }
}
