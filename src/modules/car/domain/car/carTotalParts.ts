import { PositiveNumber } from "../../../../shared";

export class CarTotalParts extends PositiveNumber<"CarTotalParts"> {
  constructor(num: number) {
    super(num, "CarTotalParts");
  }
}
