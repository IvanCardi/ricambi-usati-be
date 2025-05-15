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

    const customer = order.customer
      ? mapOrderQueryModelCustomer(order.customer)
      : undefined;
    const products = mapOrderQueryModelProducts(order.products, order.customer);

    return {
      id: order.id,
      status: order.status,
      customer,
      products,
      address: {
        streetName: order.info.address.streetName,
        streetName2: order.info.address.streetName2,
        city: order.info.address.city,
        country: order.info.address.country,
        province: order.info.address.province,
        administrativeArea: order.info.address.administrativeArea,
        dependentLocality: order.info.address.dependentLocality,
        postalCode: order.info.address.postalCode,
      },
      totalPrice: order.productsAmount,
      info: {
        email: order.info.email,
        firstName: order.info.firstName,
        lastName: order.info.lastName,
        details: order.info.details,
      },
      createdAt: order.createdAt.toISOString(),
    };
  }
}
