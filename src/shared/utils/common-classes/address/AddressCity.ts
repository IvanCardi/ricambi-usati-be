import { NonEmptyString } from "../../NonEmptyString";

export class AddressCity extends NonEmptyString<"AddressCity"> {
  constructor(city: string) {
    super(city, "AddressCity");
  }
}
