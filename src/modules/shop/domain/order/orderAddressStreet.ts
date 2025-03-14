import { NonEmptyString } from "../../../../shared";

export class OrderAddressStreet extends NonEmptyString<"OrderAddressStreet"> {
  constructor(street: string) {
    super(street, "OrderAddressStreet");
  }
}
