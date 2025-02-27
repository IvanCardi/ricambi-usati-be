import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class CarPartPrice extends PositiveNumber<"CarPartPrice"> {
  constructor(warranty: number) {
    super(warranty, "CarPartPrice");
  }
}
