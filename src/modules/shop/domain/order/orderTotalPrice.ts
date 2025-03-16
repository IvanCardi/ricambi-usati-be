import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class OrderTotalPrice extends PositiveNumber<"OrderTotalPrice"> {
  constructor(price: number) {
    super(price, "OrderTotalPrice");
  }
}
