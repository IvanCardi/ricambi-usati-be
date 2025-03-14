import { NonEmptyString } from "../../../../shared";

export class OrderAddressState extends NonEmptyString<"OrderAddressState"> {
  constructor(state: string) {
    super(state, "OrderAddressState");
  }
}
