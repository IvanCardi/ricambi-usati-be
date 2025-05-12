import { NonEmptyString } from "../../NonEmptyString";

export class AddressStreet extends NonEmptyString<"AddressStreet"> {
  constructor(street: string) {
    super(street, "AddressStreet");
  }
}
