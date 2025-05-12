import { PositiveNumber } from "../../../../shared";

export class OrderTotalPrice extends PositiveNumber<"OrderTotalPrice"> {
  constructor(price: number) {
    super(price, "OrderTotalPrice");
  }
}
