import { CarPart } from "../domain/carPart/carPart";
import { Order } from "../domain/order/order";
import { OrderStatus } from "../domain/order/orderStatus";
import { createPrivateCustomer } from "./createPrivateCustomer";
import { createShippingAddress } from "./createShippingAddress";
import createShippingInfo from "./createShippingInfo";

export function createPrivateCustomerOrder(props: {
  products: CarPart[];
  status?: OrderStatus;
}): Order {
  return new Order({
    customer: createPrivateCustomer({}),
    products: props.products,
    info: createShippingInfo({}),
    status: props.status ?? "in payment",
    createdAt: new Date(),
    deliveryOption: "delivery",
    paymentMethod: "online",
    productsAmount: 10, shippingCosts: 10
  });
}
