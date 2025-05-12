import { OrderDraft } from "../orderDraft/orderDraft";

export class ShippingCostsCalculator {
  constructor(private orderDraft: OrderDraft) {}

  calculate(): number {
    return Math.max(
      ...this.orderDraft.products.map((p) => p.adHocShippingCosts ?? 0)
    );
  }
}
