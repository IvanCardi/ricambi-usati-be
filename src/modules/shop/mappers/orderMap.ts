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
import { ShippingAddress } from "../domain/shippingAddress/shippingAddress";

export class OrderMap {
  toPersistance(order: Order) {
    return {
      _id: order.id,
      customerId: order.customer.id,
      products: order.products.map((p) => p.id),
      firstName: order.firstName,
      lastName: order.lastName,
      streetName: order.streetName,
      streetName2: order.streetName2,
      city: order.city,
      country: order.country,
      province: order.province,
      administrativeArea: order.administrativeArea,
      dependentLocality: order.dependentLocality,
      postalCode: order.postalCode,
      email: order.email,
      details: order.details,
      status: order.status,
      deliveryOption: order.deliveryOption,
      paymentMethod: order.paymentMethod,
      paymentId: order.paymentId,
      createdAt: order.createdAt.toISOString(),
    } as const;
  }

  toDomain(
    customer: Customer,
    products: CarPart[],
    order: ReturnType<typeof this.toPersistance>
  ): Order {
    return new Order(
      {
        customer,
        products,
        shippingAddress: new ShippingAddress({
          firstName: order.firstName,
          lastName: order.lastName,
          streetName: order.streetName,
          streetName2: order.streetName2,
          city: order.city,
          country: order.country,
          province: order.province,
          administrativeArea: order.administrativeArea,
          dependentLocality: order.dependentLocality,
          postalCode: order.postalCode,
        }),
        email: order.email,
        details: order.details,
        deliveryOption: order.deliveryOption,
        paymentMethod: order.paymentMethod,
        status: order.status,
        paymentId: order.paymentId,
        createdAt: new Date(order.createdAt),
      },
      order._id
    );
  }
}
