import { NonEmptyString } from "../../../../shared";

export class CarPartNumber extends NonEmptyString<"CarPartNumber"> {
  constructor(name: string) {
    super(name, "CarPartNumber");
  }
}
