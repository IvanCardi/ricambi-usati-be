import { PositiveNumber } from "../../../../shared";

export class CarSoldParts extends PositiveNumber<"CarSoldParts"> {
  constructor(num: number) {
    super(num, "CarSoldParts");
  }
}
