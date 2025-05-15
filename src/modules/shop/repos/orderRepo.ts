import { Order } from "../domain/order/order";

export interface IOrderRepo {
  getByOrderDraftId(orderDraftId: string): Promise<Order | undefined>;
  getById(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  getAll(): Promise<Order[]>;
}
