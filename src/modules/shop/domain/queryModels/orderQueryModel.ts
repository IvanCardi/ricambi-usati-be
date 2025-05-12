import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { PrivateCostumer } from "../customer/privateCustomer/privateCostumer";
import { OrderStatus } from "../order/orderStatus";
import { DiscountedPriceCalculator } from "../services/discountedPriceCalculator";
import { ShippingAddress } from "../shippingAddress/shippingAddress";

export type OrderQueryModel = {
  id: string;
  customer:
    | {
        id: string;
        type: "private";
        email: string;
        firstName: string;
        lastName: string;
      }
    | { id: string; type: "company"; name: string; email: string };
  address: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetName2?: string;
    city?: string;
    country: string;
    province?: string;
    administrativeArea?: string;
    dependentLocality?: string;
    postalCode?: string;
  };
  products: {
    id: string;
    name: string;
    photo: string;
    description: string;
    price: number;
    discountedPrice?: number;
  }[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
};

export function mapOrderQueryModelProducts(
  carParts: CarPart[],
  customer: Customer
): OrderQueryModel["products"] {
  return carParts.map((carPart) => ({
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
  }));
}

export function mapOrderQueryModelCustomer(customer: Customer): OrderQueryModel["customer"]{
  if (customer instanceof PrivateCostumer) {
    return {
      id: customer.id,
      type: "private",
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
    } as const;
  }

  if (customer instanceof CompanyCustomer) {
    return {
      id: customer.id,
      type: "company",
      name: customer.name,
      email: customer.email,
    } as const;
  }

  throw new Error("invalid customer");
}
