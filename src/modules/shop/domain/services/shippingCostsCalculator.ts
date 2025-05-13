import { OrderDraft } from "../orderDraft/orderDraft";

export class ShippingCostsCalculator {
  constructor(private orderDraft: OrderDraft) {}

  calculate(): number {
    const max = Math.max(
      ...this.orderDraft.products.map((p) => p.adHocShippingCosts ?? 0)
    );

    if (
      this.orderDraft.info &&
      this.orderDraft.info.address.country !== "Italia"
    ) {
      return max + 15;
    }

    return max;
  }
}
