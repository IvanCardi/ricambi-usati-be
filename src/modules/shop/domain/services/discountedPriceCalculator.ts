import { CarPartPrice } from "../carPart/carPartPrice";
import { CompanyDiscount } from "../customer/companyCustomer/companyDiscount";

export class DiscountedPriceCalculator {
  private discount: CompanyDiscount;

  constructor(discount: CompanyDiscount) {
    this.discount = discount;
  }

  calculate(price: CarPartPrice): number {
    return price.valueOf() - (price.valueOf() * this.discount.valueOf()) / 100;
  }
}
