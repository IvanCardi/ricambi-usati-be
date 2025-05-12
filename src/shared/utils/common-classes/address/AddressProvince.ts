import { NonEmptyString } from "../../NonEmptyString";

export class AddressProvince extends NonEmptyString<"AddressProvince"> {
  constructor(province: string) {
    super(province, "AddressProvince");
  }
}
