import { NonEmptyString } from "../../../../shared";

export class OrderAddressZipCode extends NonEmptyString<"OrderAddressZipCode"> {
  constructor(zipCode: string) {
    super(zipCode, "OrderAddressZipCode");
  }
}
