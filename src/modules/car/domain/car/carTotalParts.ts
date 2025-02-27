import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class CarTotalParts extends PositiveNumber<"CarTotalParts"> {
  constructor(num: number) {
    super(num, "CarTotalParts");
  }
}
