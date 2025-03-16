import { UseCase } from "../../../../shared";
import { Order } from "../../domain/order/order";
import { OrderAddress } from "../../domain/order/orderAddress";
import { OrderAddressCity } from "../../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../../domain/order/orderAddressProvince";
import { OrderAddressState } from "../../domain/order/orderAddressState";
import { OrderAddressStreet } from "../../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../../domain/order/orderAddressZipCode";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderRepo } from "../../repos/orderRepo";
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
    private carPartRepo: ICarPartRepo
  ) {}

  async execute(input: CreateOrderInput): Promise<any> {
    const customer = await this.customerRepo.getById(input.userId);
    const products = await this.carPartRepo.getByIds(input.products);

    if (!customer) {
      throw new UserNotFound();
    }

    if (input.products.length !== products.length) {
      throw new CarPartNotFound();
    }

    const order = new Order({
      customer,
      products,
      address: new OrderAddress({
        city: new OrderAddressCity(input.city),
        number: new OrderAddressNumber(input.streetNumber),
        province: new OrderAddressProvince(input.province),
        state: new OrderAddressState(input.state),
        street: new OrderAddressStreet(input.street),
        zipCode: new OrderAddressZipCode(input.zipCode),
      }),
      status: "created",
    });

    await this.orderRepo.save(order);
  }
}
