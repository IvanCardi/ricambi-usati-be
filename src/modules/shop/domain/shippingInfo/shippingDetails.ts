import { NonEmptyString } from "../../../../shared";

export class ShippingDetails extends NonEmptyString<"ShippingDetails"> {
  constructor(value: string) {
    super(value, "ShippingDetails");
  }
}
