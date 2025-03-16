import { CarPart } from "../domain/carPart/carPart";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { Order } from "../domain/order/order";
import { OrderAddress } from "../domain/order/orderAddress";
import { OrderAddressCity } from "../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../domain/order/orderAddressProvince";
import { OrderAddressState } from "../domain/order/orderAddressState";
import { OrderAddressStreet } from "../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../domain/order/orderAddressZipCode";
import { createCompanyCustomer } from "./createCompanyCustomer";
import { createPrivateCustomer } from "./createPrivateCustomer";

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
    address: new OrderAddress({
      city: new OrderAddressCity("city"),
      state: new OrderAddressState("state"),
      zipCode: new OrderAddressZipCode("zipCode"),
      province: new OrderAddressProvince("province"),
      number: new OrderAddressNumber("number"),
      street: new OrderAddressStreet("street"),
    }),
    status: "created",
  });
}
