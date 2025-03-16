import { CarPart } from "../domain/carPart/carPart";
import { Order } from "../domain/order/order";
import { OrderAddress } from "../domain/order/orderAddress";
import { OrderAddressCity } from "../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../domain/order/orderAddressProvince";
import { OrderAddressState } from "../domain/order/orderAddressState";
import { OrderAddressStreet } from "../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../domain/order/orderAddressZipCode";
import { createPrivateCustomer } from "./createPrivateCustomer";

export function createPrivateCustomerOrder(props: {
  products: CarPart[];
}): Order {
  return new Order({
    customer: createPrivateCustomer({}),
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
