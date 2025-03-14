import { NonEmptyString } from "../../../../shared";

export class OrderAddressNumber extends NonEmptyString<"OrderAddressNumber"> {
  constructor(number: string) {
    super(number, "OrderAddressNumber");
  }
}
