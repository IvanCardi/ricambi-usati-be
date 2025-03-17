import { UseCase } from "../../../../shared";
import { IOrderRepo } from "../../repos/orderRepo";
import { OrderNotFound } from "../_errors/orderNotFound";

export type MarkOrderAsShippedInput = {
  orderId: string;
};

export class MarkOrderAsShipped
  implements UseCase<MarkOrderAsShippedInput, void>
{
  constructor(private orderRepo: IOrderRepo) {}

  async execute(input: MarkOrderAsShippedInput): Promise<void> {
    const order = await this.orderRepo.getById(input.orderId);

    if (!order) {
      throw new OrderNotFound();
    }

    order.markAsShipped();

    await this.orderRepo.save(order);
  }
}
