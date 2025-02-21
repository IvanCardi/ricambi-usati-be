import { NonEmptyString } from "../../../../shared";

export class CarPlate extends NonEmptyString<"CarPlate"> {
  constructor(plate: string) {
    super(plate, "CarPlate");
  }
}
