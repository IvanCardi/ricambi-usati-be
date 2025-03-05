import { PositiveNumber } from "../../../../../shared/utils/PositiveNumber";

export class CompanyDiscount extends PositiveNumber<"CompanyDiscount"> {
  constructor(discount: number) {
    super(discount, "CompanyDiscount");
  }
}
