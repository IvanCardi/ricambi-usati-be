import { PositiveNumber } from "../../../../shared";

export class CarKilometers extends PositiveNumber<"CarKilometers"> {
  constructor(km: number) {
    super(km, "CarKilometers");
  }
}
