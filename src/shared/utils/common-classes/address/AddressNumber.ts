import { NonEmptyString } from "../../NonEmptyString";

export class AddressNumber extends NonEmptyString<"AddressNumber"> {
  constructor(number: string) {
    super(number, "AddressNumber");
  }
}
