import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { DiscountedPriceCalculator } from "../services/discountedPriceCalculator";

export type GetOrderDraftQueryModel = {
  id: string;
  products: {
    id: string;
    name: string;
    photo: string;
    description: string;
    price: number;
    discountedPrice?: number;
  }[];
  totalProductsPrice: number;
  shippingCosts: number;
  info?: {
    firstName: string;
    lastName: string;
    email: string;
    details?: string;
    address: {
      streetName: string;
      streetName2?: string;
      city?: string;
      country: string;
      province?: string;
      administrativeArea?: string;
      dependentLocality?: string;
      postalCode?: string;
    }
  }
};

export function mapGetOrderDraftQueryModelProducts(
  carParts: CarPart[],
  customer: Customer | undefined
): GetOrderDraftQueryModel["products"] {
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
