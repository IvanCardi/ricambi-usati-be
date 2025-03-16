import { CarPartPrice } from "../carPart/carPartPrice";
import { CompanyDiscount } from "../customer/companyCustomer/companyDiscount";
import { DiscountedPriceCalculator } from "./discountedPriceCalculator";

test("Should return the discounted price based on the company discount percentage", () => {
  const discountedPriceCalculator = new DiscountedPriceCalculator(
    new CompanyDiscount(10)
  );

  const discountedPrice = discountedPriceCalculator.calculate(
    new CarPartPrice(100)
  );

  expect(discountedPrice).toEqual(90);
});
