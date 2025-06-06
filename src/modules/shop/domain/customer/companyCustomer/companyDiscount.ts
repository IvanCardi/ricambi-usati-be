import { PositiveNumber } from "../../../../../shared";
import { InvalidCompanyDiscount } from "../../_errors/invalidCompanyDiscount";

export class CompanyDiscount extends PositiveNumber<"CompanyDiscount"> {
  constructor(discount: number) {
    super(discount, "CompanyDiscount");

    if (discount > 100) {
      throw new InvalidCompanyDiscount();
    }
  }
}
