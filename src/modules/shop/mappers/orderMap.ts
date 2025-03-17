import { CarPart } from "../domain/carPart/carPart";
import { Customer } from "../domain/customer/customer";
import { Order } from "../domain/order/order";
import { OrderAddress } from "../domain/order/orderAddress";
import { OrderAddressCity } from "../domain/order/orderAddressCity";
import { OrderAddressNumber } from "../domain/order/orderAddressNumber";
import { OrderAddressProvince } from "../domain/order/orderAddressProvince";
import { OrderAddressState } from "../domain/order/orderAddressState";
import { OrderAddressStreet } from "../domain/order/orderAddressStreet";
import { OrderAddressZipCode } from "../domain/order/orderAddressZipCode";

export class OrderMap {
  toPersistance(order: Order) {
    return {
      _id: order.id,
      customerId: order.customer.id,
      products: order.products.map((p) => p.id),
      street: order.street,
      number: order.number,
      zipCode: order.zipCode,
      province: order.province,
      city: order.city,
      state: order.state,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    } as const;
  }

  toDomain(
    order: ReturnType<typeof this.toPersistance>,
    customer: Customer,
    products: CarPart[]
  ): Order {
    return new Order(
      {
        customer,
        products,
        address: new OrderAddress({
          city: new OrderAddressCity(order.city),
          number: new OrderAddressNumber(order.number),
          province: new OrderAddressProvince(order.province),
          state: new OrderAddressState(order.state),
          street: new OrderAddressStreet(order.street),
          zipCode: new OrderAddressZipCode(order.zipCode),
        }),
        status: order.status,
        createdAt: new Date(order.createdAt),
      },
      order._id
    );
  }
}
