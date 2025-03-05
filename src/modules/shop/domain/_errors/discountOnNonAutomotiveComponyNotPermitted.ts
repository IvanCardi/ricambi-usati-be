import { Error } from "../../../../shared";

export class DiscountOnNonAutomotiveComponyNotPermitted extends Error<"DiscountOnNonAutomotiveComponyNotPermitted"> {
  constructor() {
    super("DiscountOnNonAutomotiveComponyNotPermitted");
  }
}
