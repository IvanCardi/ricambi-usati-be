import { Order } from "../domain/order/order";

export interface IOrderRepo {
  save(order: Order): Promise<void>;
  getAll(): Promise<Order[]>;
}
