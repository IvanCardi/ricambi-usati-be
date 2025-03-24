import { NonEmptyString } from "../../../../shared";

export class AddressZipCode extends NonEmptyString<"AddressZipCode"> {
  constructor(zipCode: string) {
    super(zipCode, "AddressZipCode");
  }
}
