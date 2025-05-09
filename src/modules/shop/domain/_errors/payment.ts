import { Error } from "../../../../shared";

export namespace PaymentError {
  export class CheckoutUrlCreationFailed extends Error<"CheckoutUrlCreationFailed"> {
    constructor() {
      super("CheckoutUrlCreationFailed");
    }
  }
}
