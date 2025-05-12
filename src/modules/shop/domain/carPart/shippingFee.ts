import { PositiveNumber } from "../../../../shared";

export class ShippingFee extends PositiveNumber<"ShippingFee"> {
  constructor(value: number) {
    super(value, "ShippingFee");
  }
}
