import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { Customer } from "../../domain/customer/customer";
import { PrivateCostumer } from "../../domain/customer/privateCustomer/privateCostumer";
import { OrderQueryModel } from "../../domain/queryModels/orderQueryModel";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderRepo } from "../../repos/orderRepo";

export class GetOrders implements UseCase<void, OrderQueryModel[]> {
  constructor(
    private orderRepo: IOrderRepo,
    private carPartRepo: ICarPartRepo,
    private customerRepo: ICustomerRepo
  ) {}

  async execute(): Promise<OrderQueryModel[]> {
    const orders = await this.orderRepo.getAll();

    const orderQueryModels: OrderQueryModel[] = [];

    for (const order of orders) {
      const customer = await this.customerRepo.getById(order.userId);
      const products = await this.carPartRepo.getByIds(order.products);

      if (customer && products.length > 0) {
        orderQueryModels.push({
          id: order.id,
          status: order.status,
          user: this.mapCustomer(customer),
          products: products.map(this.mapProduct),
          address: {
            city: order.city,
            number: order.number,
            province: order.province,
            state: order.state,
            street: order.street,
            zipCode: order.zipCode,
          },
        });
      }
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
