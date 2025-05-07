import { Address } from "../domain/address/address";
import { AddressCity } from "../domain/address/addressCity";
import { AddressNumber } from "../domain/address/addressNumber";
import { AddressProvince } from "../domain/address/addressProvince";
import { AddressState } from "../domain/address/addressState";
import { AddressStreet } from "../domain/address/addressStreet";
import { AddressZipCode } from "../domain/address/addressZipCode";
import { CarPart } from "../domain/carPart/carPart";
import { Customer } from "../domain/customer/customer";
import { Order } from "../domain/order/order";

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
      paymentId: order.paymentId,
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
        address: new Address({
          city: new AddressCity(order.city),
          number: new AddressNumber(order.number),
          province: new AddressProvince(order.province),
          state: new AddressState(order.state),
          street: new AddressStreet(order.street),
          zipCode: new AddressZipCode(order.zipCode),
        }),
        status: order.status,
        paymentId: order.paymentId,
        createdAt: new Date(order.createdAt),
      },
      order._id
    );
  }
}
