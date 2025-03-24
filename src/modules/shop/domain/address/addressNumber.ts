import { NonEmptyString } from "../../../../shared";

export class AddressNumber extends NonEmptyString<"AddressNumber"> {
  constructor(number: string) {
    super(number, "AddressNumber");
  }
}
