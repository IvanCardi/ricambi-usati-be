import { ICarPartRepo } from "../../repos/carPartRepo";
import { IOrderDraftRepo } from "../../repos/orderDraftRepo";
import { IOrderRepo } from "../../repos/orderRepo";
import { IPaymentGateway } from "../../repos/paymentGateway";

export class CheckPaymentStatusWebhook {
  constructor(
    private paymentService: IPaymentGateway,
    private orderRepo: IOrderRepo,
    private orderDraftRepo: IOrderDraftRepo,
    private carPartRepo: ICarPartRepo
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const payment = await this.paymentService.getPaymentStatus(id);
    const order = await this.orderRepo.getById(payment.orderId);

    if (!order) throw new Error("Order not found");

    if (payment.status === "paid") {
      order.setStatus("paid");
      await this.orderDraftRepo.deleteById(order.orderDraftId);
      await this.orderRepo.save(order);
      return;
    } else {
      order.products.forEach((p) => p.setToAvailable());
      await this.carPartRepo.saveAll(order.products);
      await this.orderRepo.delete(order.id);
      return;
    }
  }
}
