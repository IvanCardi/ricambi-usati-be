import { UseCase } from "../../../../shared";
import { OrderStatus } from "../../domain/order/orderStatus";
import { IOrderRepo } from "../../repos/orderRepo";
import { OrderNotFound } from "../_errors/orderNotFound";

export type CheckOrderStatusInput = {
  orderId: string;
};

export class CheckOrderStatus
  implements UseCase<CheckOrderStatusInput, OrderStatus>
{
  constructor(private orderRepo: IOrderRepo) {}

  async execute(input: CheckOrderStatusInput): Promise<OrderStatus> {
    const order = await this.orderRepo.getById(input.orderId);

    if (!order) {
      throw new OrderNotFound();
    }

    return order.status;
  }
}
