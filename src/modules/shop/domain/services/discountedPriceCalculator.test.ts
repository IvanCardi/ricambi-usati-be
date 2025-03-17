import { DiscountedPriceCalculator } from "./discountedPriceCalculator";

test("Should return the discounted price based on the company discount percentage", () => {
  const discountedPriceCalculator = new DiscountedPriceCalculator(10);

  const discountedPrice = discountedPriceCalculator.calculate(100);

  expect(discountedPrice).toEqual(90);
});
