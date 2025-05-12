import { UseCase } from "../../../../shared";
import { Order } from "../../domain/order/order";
import { DeliveryOption } from "../../domain/order/orderDeliveryOptions";
import { PaymentMethod } from "../../domain/order/orderPaymentMethods";
import { ShippingAddress } from "../../domain/shippingAddress/shippingAddress";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderRepo } from "../../repos/orderRepo";
import { IPaymentGateway } from "../../repos/paymentGateway";
import { CarPartNotFound } from "../_errors/carPartNotFound";
import { UserNotFound } from "../_errors/userNotFound";

export type CreateOrderInput = {
  userId: string;
  products: string[];
  firstName: string;
  lastName: string;
  streetName: string;
  streetName2: string | undefined;
  city: string | undefined;
  country: string;
  province: string | undefined;
  administrativeArea: string | undefined;
  dependentLocality: string | undefined;
  postalCode: string | undefined;
  email: string;
  details: string | undefined;
  deliveryMethod: string;
  paymentMethod: string;
};

export class CreateOrder implements UseCase<CreateOrderInput, any> {
  constructor(
    private orderRepo: IOrderRepo,
    private customerRepo: ICustomerRepo,
    private carPartRepo: ICarPartRepo,
    private paymentService: IPaymentGateway
  ) {}

  async execute(
    input: CreateOrderInput
  ): Promise<{ checkoutPaymentUrl: string; orderId: string }> {
    const customer = await this.customerRepo.getById(
      "681c750c1e7bc04bc5e026d3"
    ); //input.userId
    const products = await this.carPartRepo.getByIds(input.products);

    if (!customer) {
      throw new UserNotFound();
    }

    if (input.products.length !== products.length) {
      throw new CarPartNotFound();
    }

    const order = Order.create({
      customer,
      products,
      shippingAddress: new ShippingAddress({
        firstName: input.firstName,
        lastName: input.lastName,
        streetName: input.streetName,
        streetName2: input.streetName2,
        city: input.city,
        country: input.country,
        province: input.province,
        administrativeArea: input.administrativeArea,
        dependentLocality: input.dependentLocality,
        postalCode: input.postalCode,
      }),
      email: input.email,
      details: input.details,
      deliveryOption: input.deliveryMethod as DeliveryOption,
      paymentMethod: input.paymentMethod as PaymentMethod,
    });

    const { paymentId, checkoutPaymentUrl } =
      await this.paymentService.createPayment(order.getTotalPrice(), order.id);

    order.setPaymentId(paymentId);

    await this.orderRepo.save(order);

    return { checkoutPaymentUrl, orderId: order.id };
  }
}
