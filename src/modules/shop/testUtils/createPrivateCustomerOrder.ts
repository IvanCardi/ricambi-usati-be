import { CarPart } from "../domain/carPart/carPart";
import { Order } from "../domain/order/order";
import { OrderStatus } from "../domain/order/orderStatus";
import { createPrivateCustomer } from "./createPrivateCustomer";
import { createShippingAddress } from "./createShippingAddress";

export function createPrivateCustomerOrder(props: {
  products: CarPart[];
  status?: OrderStatus;
}): Order {
  return new Order({
    customer: createPrivateCustomer({}),
    products: props.products,
    shippingAddress: createShippingAddress({}),
    email: "test@gmail.com",
    status: props.status ?? "created",
    createdAt: new Date(),
    deliveryOption: "Corriere espresso",
    paymentMethod: "Paga con carte",
  });
}
