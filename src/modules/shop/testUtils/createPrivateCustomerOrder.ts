import { CarPart } from "../domain/carPart/carPart";
import { Order } from "../domain/order/order";
import { OrderStatus } from "../domain/order/orderStatus";
import { createAddress } from "./createAddress";
import { createPrivateCustomer } from "./createPrivateCustomer";

export function createPrivateCustomerOrder(props: {
  products: CarPart[];
  status?: OrderStatus;
}): Order {
  return new Order({
    customer: createPrivateCustomer({}),
    products: props.products,
    address: createAddress({}),
    status: props.status ?? "created",
    createdAt: new Date(),
  });
}
