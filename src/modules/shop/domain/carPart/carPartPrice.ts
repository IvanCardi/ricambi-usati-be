import { PositiveNumber } from "../../../../shared";

export class CarPartPrice extends PositiveNumber<"CarPartPrice"> {
  constructor(price: number) {
    super(price, "CarPartPrice");
  }
}
