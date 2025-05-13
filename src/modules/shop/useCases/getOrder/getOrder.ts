import { UseCase } from "../../../../shared";
import {
  mapOrderQueryModelCustomer,
  mapOrderQueryModelProducts,
  OrderQueryModel,
} from "../../domain/queryModels/orderQueryModel";
import { IOrderRepo } from "../../repos/orderRepo";
import { OrderNotFound } from "../_errors/orderNotFound";

export type GetOrderInput = {
  id: string;
};

export class GetOrder implements UseCase<GetOrderInput, OrderQueryModel> {
  constructor(private orderRepo: IOrderRepo) {}

  async execute(input: GetOrderInput): Promise<OrderQueryModel> {
    const order = await this.orderRepo.getById(input.id);

    if (!order) {
      throw new OrderNotFound();
    }

    const customer = mapOrderQueryModelCustomer(order.customer);
    const products = mapOrderQueryModelProducts(order.products, order.customer);

    return {
      id: order.id,
      status: order.status,
      customer,
      products,
      address: {
        streetName: order.streetName,
        streetName2: order.streetName2,
        city: order.city,
        country: order.country,
        province: order.province,
        administrativeArea: order.administrativeArea,
        dependentLocality: order.dependentLocality,
        postalCode: order.postalCode,
      },
      totalPrice: order.getTotalPrice(),
      createdAt: order.createdAt.toISOString(),
    };
  }
}
