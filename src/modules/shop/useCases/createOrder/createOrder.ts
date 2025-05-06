import { UseCase } from "../../../../shared";
import { Address } from "../../domain/address/address";
import { AddressCity } from "../../domain/address/addressCity";
import { AddressNumber } from "../../domain/address/addressNumber";
import { AddressProvince } from "../../domain/address/addressProvince";
import { AddressState } from "../../domain/address/addressState";
import { AddressStreet } from "../../domain/address/addressStreet";
import { AddressZipCode } from "../../domain/address/addressZipCode";
import { Order } from "../../domain/order/order";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderRepo } from "../../repos/orderRepo";
import { IPaymentGateway } from "../../repos/paymentGateway";
import { CarPartNotFound } from "../_errors/carPartNotFound";
import { UserNotFound } from "../_errors/userNotFound";

export type CreateOrderInput = {
  userId: string;
  products: string[];
  street: string;
  streetNumber: string;
  zipCode: string;
  province: string;
  city: string;
  state: string;
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
  ): Promise<{ checkoutPaymentUrl: string }> {
    const customer = await this.customerRepo.getById(input.userId);
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
      address: new Address({
        city: new AddressCity(input.city),
        number: new AddressNumber(input.streetNumber),
        province: new AddressProvince(input.province),
        state: new AddressState(input.state),
        street: new AddressStreet(input.street),
        zipCode: new AddressZipCode(input.zipCode),
      }),
    });

    const payment = await this.paymentService.createPayment(
      order.getTotalPrice(),
      order.id
    );

    order.setPaymentId(payment.id);

    await this.orderRepo.save(order);

    return { checkoutPaymentUrl: payment.checkoutUrl };
  }
}
