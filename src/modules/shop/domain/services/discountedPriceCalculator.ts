export class DiscountedPriceCalculator {
  private discount: number;

  constructor(discount: number) {
    this.discount = discount;
  }

  calculate(price: number): number {
    return price - (price * this.discount) / 100;
  }
}
