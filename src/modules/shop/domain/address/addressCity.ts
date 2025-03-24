import { NonEmptyString } from "../../../../shared";

export class AddressCity extends NonEmptyString<"AddressCity"> {
  constructor(city: string) {
    super(city, "AddressCity");
  }
}
