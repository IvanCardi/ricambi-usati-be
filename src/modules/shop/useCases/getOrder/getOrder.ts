import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { Customer } from "../../domain/customer/customer";
import { PrivateCostumer } from "../../domain/customer/privateCustomer/privateCostumer";
import { OrderQueryModel } from "../../domain/queryModels/orderQueryModel";
import { DiscountedPriceCalculator } from "../../domain/services/discountedPriceCalculator";
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

    const customer = this.mapCustomer(order.customer);
    const products = order.products.map((product) =>
      this.mapProduct(product, order.customer)
    );

    return {
      id: order.id,
      status: order.status,
      customer,
      products,
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
    };
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

  private mapProduct(carPart: CarPart, customer: Customer) {
    return {
      id: carPart.id,
      name: carPart.name,
      photo: carPart.photos[0],
      description: carPart.description,
      price: carPart.price,
      discountedPrice:
        customer instanceof CompanyCustomer && customer.isAutomotive
          ? new DiscountedPriceCalculator(customer.discount).calculate(
              carPart.price
            )
          : undefined,
    } as const;
  }
}
