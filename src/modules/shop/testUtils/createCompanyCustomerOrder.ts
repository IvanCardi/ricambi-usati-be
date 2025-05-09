import { CarPart } from "../domain/carPart/carPart";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { Order } from "../domain/order/order";
import { createCompanyCustomer } from "./createCompanyCustomer";
import { createShippingAddress } from "./createShippingAddress";

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
    shippingAddress: createShippingAddress({}),
    email: "test@gmail.com",
    status: "created",
    createdAt: new Date(),
    deliveryOption: "Corriere espresso",
    paymentMethod: "Paga con carte",
  });
}
