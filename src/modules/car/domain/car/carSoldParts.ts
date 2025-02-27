import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class CarSoldParts extends PositiveNumber<"CarSoldParts"> {
  constructor(num: number) {
    super(num, "CarSoldParts");
  }
}
