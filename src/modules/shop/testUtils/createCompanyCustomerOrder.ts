import { CarPart } from "../domain/carPart/carPart";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { Order } from "../domain/order/order";
import { createAddress } from "./createAddress";
import { createCompanyCustomer } from "./createCompanyCustomer";

export function createCompanyCustomerOrder(props: {
  products: CarPart[];
  discount: number;
  isAutomotive: boolean;
}): Order {
  return new Order({
    customer: createCompanyCustomer({
      discount: new CompanyDiscount(props.discount),
      isAutomotive: props.isAutomotive,
    }),
    products: props.products,
    address: createAddress({}),
    status: "created",
    createdAt: new Date(),
  });
}
