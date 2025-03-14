import { NonEmptyString } from "../../../../shared";

export class OrderAddressProvince extends NonEmptyString<"OrderAddressProvince"> {
  constructor(province: string) {
    super(province, "OrderAddressProvince");
  }
}
