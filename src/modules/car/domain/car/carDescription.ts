import { NonEmptyString } from "../../../../shared";

export class CarDescription extends NonEmptyString<"CarDescription"> {
  constructor(description: string) {
    super(description, "CarDescription");
  }
}
