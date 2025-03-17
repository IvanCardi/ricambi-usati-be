import { Order } from "../domain/order/order";

export interface IOrderRepo {
  getById(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  getAll(): Promise<Order[]>;
}
