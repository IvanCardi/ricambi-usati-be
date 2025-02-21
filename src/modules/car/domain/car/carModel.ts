import { NonEmptyString } from "../../../../shared";

export class CarModel extends NonEmptyString<"CarModel"> {
  constructor(model: string) {
    super(model, "CarModel");
  }
}
