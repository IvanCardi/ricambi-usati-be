import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class CarKilometers extends PositiveNumber<"CarKilometers"> {
  constructor(km: number) {
    super(km, "CarKilometers");
  }
}
