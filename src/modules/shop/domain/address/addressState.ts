import { NonEmptyString } from "../../../../shared";

export class AddressState extends NonEmptyString<"AddressState"> {
  constructor(state: string) {
    super(state, "AddressState");
  }
}
