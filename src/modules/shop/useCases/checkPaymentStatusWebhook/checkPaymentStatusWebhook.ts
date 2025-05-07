import { IOrderRepo } from "../../repos/orderRepo";
import { IPaymentGateway } from "../../repos/paymentGateway";

export class CheckPaymentStatusWebhook {
  constructor(
    private paymentService: IPaymentGateway,
    private orderRepo: IOrderRepo
  ) {}

  async execute(paymentId: string): Promise<void> {
    const paymentStatus = await this.paymentService.getPaymentStatus(paymentId);
    const order = await this.orderRepo.getByPaymentId(paymentId);

    if (!order) throw new Error("Order not found");

    if (paymentStatus === "paid") {
      order.setStatus("paid");
    }

    await this.orderRepo.save(order);
  }
}
