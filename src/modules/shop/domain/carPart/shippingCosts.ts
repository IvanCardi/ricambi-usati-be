import { PositiveNumber } from "../../../../shared";

export class ShippingCosts extends PositiveNumber<"ShippingCosts"> {
  constructor(value: number) {
    super(value, "ShippingCosts");
  }
}
