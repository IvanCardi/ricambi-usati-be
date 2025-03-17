import { CarPart } from "../domain/carPart/carPart";
import { Order } from "../domain/order/order";
import { createAddress } from "./createAddress";
import { createPrivateCustomer } from "./createPrivateCustomer";

export function createPrivateCustomerOrder(props: {
  products: CarPart[];
}): Order {
  return new Order({
    customer: createPrivateCustomer({}),
    products: props.products,
    address: createAddress({}),
    status: "created",
    createdAt: new Date(),
  });
}
