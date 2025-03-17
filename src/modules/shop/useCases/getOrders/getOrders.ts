import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { Customer } from "../../domain/customer/customer";
import { PrivateCostumer } from "../../domain/customer/privateCustomer/privateCostumer";
import { OrderQueryModel } from "../../domain/queryModels/orderQueryModel";
import { IOrderRepo } from "../../repos/orderRepo";

export class GetOrders implements UseCase<void, OrderQueryModel[]> {
  constructor(private orderRepo: IOrderRepo) {}

  async execute(): Promise<OrderQueryModel[]> {
    const orders = await this.orderRepo.getAll();

    const orderQueryModels: OrderQueryModel[] = [];

    for (const order of orders) {
      orderQueryModels.push({
        id: order.id,
        status: order.status,
        user: this.mapCustomer(order.customer),
        products: order.products.map(this.mapProduct),
        address: {
          city: order.city,
          number: order.number,
          province: order.province,
          state: order.state,
          street: order.street,
          zipCode: order.zipCode,
        },
        totalPrice: order.getTotalPrice(),
        createdAt: order.createdAt.toISOString(),
      });
    }

    return orderQueryModels;
  }

  private mapCustomer(customer: Customer) {
    if (customer instanceof PrivateCostumer) {
      return {
        id: customer.id,
        type: "private",
        firstName: customer.firstName,
        lastName: customer.lastName,
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        id: customer.id,
        type: "company",
        name: customer.name,
      } as const;
    }

    throw new Error("invalid customer");
  }

  private mapProduct(carPart: CarPart) {
    return {
      id: carPart.id,
      name: carPart.name,
      photo: carPart.photos[0],
      description: carPart.description,
    } as const;
  }
}
