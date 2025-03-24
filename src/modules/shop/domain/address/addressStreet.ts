import { NonEmptyString } from "../../../../shared";

export class AddressStreet extends NonEmptyString<"AddressStreet"> {
  constructor(street: string) {
    super(street, "AddressStreet");
  }
}
