import { UseCase } from "../../../../shared";
import { OrderStatus } from "../../domain/order/orderStatus";
import { IOrderRepo } from "../../repos/orderRepo";
import { OrderNotFound } from "../_errors/orderNotFound";

export type CheckOrderStatusInput = {
  orderId: string;
};

export class CheckOrderStatus
  implements UseCase<CheckOrderStatusInput, "paid" | "in payment" | "failed">
{
  constructor(private orderRepo: IOrderRepo) {}

  async execute(
    input: CheckOrderStatusInput
  ): Promise<"paid" | "in payment" | "failed"> {
    const order = await this.orderRepo.getById(input.orderId);

    if (!order || order.status === "shipped") {
      return "failed";
    }

    return order.status;
  }
}
