import { NonEmptyString } from "../../NonEmptyString";

export class AddressZipCode extends NonEmptyString<"AddressZipCode"> {
  constructor(zipCode: string) {
    super(zipCode, "AddressZipCode");
  }
}
