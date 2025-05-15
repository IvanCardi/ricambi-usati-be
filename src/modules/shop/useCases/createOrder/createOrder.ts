import { UseCase } from "../../../../shared";
import { Order } from "../../domain/order/order";
import { DeliveryOption } from "../../domain/order/orderDeliveryOptions";
import { PaymentMethod } from "../../domain/order/orderPaymentMethods";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { IOrderDraftRepo } from "../../repos/orderDraftRepo";
import { IOrderRepo } from "../../repos/orderRepo";
import { IPaymentGateway } from "../../repos/paymentGateway";
import { OrderDraftNotFound } from "../_errors/orderDraftNotFound";

export type CreateOrderInput = {
  userId: string;
  orderDraftId: string;
  deliveryMethod: string;
  paymentMethod: string;
};

export class CreateOrder implements UseCase<CreateOrderInput, string> {
  constructor(
    private orderDraftRepo: IOrderDraftRepo,
    private carPartRepo: ICarPartRepo,
    private orderRepo: IOrderRepo,
    private paymentService: IPaymentGateway
  ) {}

  async execute(input: CreateOrderInput): Promise<string> {
    const orderDraft = await this.orderDraftRepo.getById(input.orderDraftId);

    if (!orderDraft) {
      throw new OrderDraftNotFound();
    }

    const oldOrder = await this.orderRepo.getByOrderDraftId(input.orderDraftId);

    const newOrder = Order.create({
      orderDraft,
      deliveryOption: input.deliveryMethod as DeliveryOption,
      paymentMethod: input.paymentMethod as PaymentMethod,
      oldOrderId: oldOrder?.id,
    });

    newOrder.products.map((p) => p.setToSold());

    await this.orderRepo.save(newOrder);
    await this.carPartRepo.saveAll(newOrder.products);

    const checkoutPaymentUrl = await this.paymentService.createPayment(
      newOrder.productsAmount + newOrder.shippingCosts,
      newOrder.id
    );

    return checkoutPaymentUrl;
  }
}
