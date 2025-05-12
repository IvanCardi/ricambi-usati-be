import { OrderDraft } from "../domain/orderDraft/orderDraft";

export interface IOrderDraftRepo {
  save(orderDraft: OrderDraft): Promise<void>;
  getById(id: string): Promise<OrderDraft | undefined>;
}
