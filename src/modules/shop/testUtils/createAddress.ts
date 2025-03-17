import { OrderAddress, OrderAddressProps } from "../domain/order/orderAddress";
import { OrderAddressCity } from "../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../domain/order/orderAddressProvince";
import { OrderAddressState } from "../domain/order/orderAddressState";
import { OrderAddressStreet } from "../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../domain/order/orderAddressZipCode";

export function createAddress(props: Partial<OrderAddressProps>): OrderAddress {
  return new OrderAddress({
    city: props.city ?? new OrderAddressCity("city"),
    state: props.state ?? new OrderAddressState("state"),
    zipCode: props.zipCode ?? new OrderAddressZipCode("zipCode"),
    province: props.province ?? new OrderAddressProvince("province"),
    number: props.number ?? new OrderAddressNumber("number"),
    street: props.street ?? new OrderAddressStreet("street"),
  });
}
