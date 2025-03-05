import { Error } from "../../../../shared";

export class DiscountOnPrivateCustomerNotPermitted extends Error<"DiscountOnPrivateCustomerNotPermitted"> {
  constructor() {
    super("DiscountOnPrivateCustomerNotPermitted");
  }
}
