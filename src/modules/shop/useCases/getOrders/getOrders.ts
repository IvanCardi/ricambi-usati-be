import { UseCase } from "../../../../shared";
import { Order } from "../../domain/order/order";
import { IOrderRepo } from "../../repos/orderRepo";

export class GetOrders implements UseCase<void, Order[]> {
  constructor(private orderRepo: IOrderRepo) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepo.getAll();

    return orders;
  }
}
