import { NonEmptyString } from "../../../../shared";

export class CarPartName extends NonEmptyString<"CarPartName"> {
  constructor(name: string) {
    super(name, "CarPartName");
  }
}
