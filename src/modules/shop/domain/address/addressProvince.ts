import { NonEmptyString } from "../../../../shared";

export class AddressProvince extends NonEmptyString<"AddressProvince"> {
  constructor(province: string) {
    super(province, "AddressProvince");
  }
}
