import { NonEmptyString } from "../../../../shared";

export class CarBrand extends NonEmptyString<"CarBrand"> {
  constructor(brand: string) {
    super(brand, "CarBrand");
  }
}
