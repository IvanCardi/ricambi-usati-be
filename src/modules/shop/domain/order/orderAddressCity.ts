import { NonEmptyString } from "../../../../shared";

export class OrderAddressCity extends NonEmptyString<"OrderAddressCity"> {
  constructor(city: string) {
    super(city, "OrderAddressCity");
  }
}
