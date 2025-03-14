import { UseCase } from "../../../../shared";
import { Order } from "../../domain/order/order";
import { OrderAddress } from "../../domain/order/orderAddress";
import { OrderAddressCity } from "../../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../../domain/order/orderAddressProvince";
import { OrderAddressState } from "../../domain/order/orderAddressState";
import { OrderAddressStreet } from "../../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../../domain/order/orderAddressZipCode";
import { IOrderRepo } from "../../repos/orderRepo";

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
  constructor(private orderRepo: IOrderRepo) {}

  async execute(input: CreateOrderInput): Promise<any> {
    const order = new Order({
      userId: input.userId,
      products: input.products,
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
