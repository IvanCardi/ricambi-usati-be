import { Email, FirstName, LastName } from "../../../shared";
import { CarPart } from "../domain/carPart/carPart";
import { Customer } from "../domain/customer/customer";
import { Order } from "../domain/order/order";
import { ShippingAddress } from "../domain/shippingInfo/shippingAddress";
import { ShippingDetails } from "../domain/shippingInfo/shippingDetails";
import { ShippingInfo } from "../domain/shippingInfo/shippingInfo";

export class OrderMap {
  toPersistance(order: Order) {
    return {
      _id: order.id,
      orderDraftId: order.orderDraftId,
      customerId: order.customer?.id,
      products: order.products.map((p) => p.id),
      firstName: order.info.firstName,
      lastName: order.info.lastName,
      email: order.info.email,
      details: order.info.details,
      address: {
        country: order.info.address.country,
        streetName: order.info.address.streetName,
        streetName2: order.info.address.streetName2,
        postalCode: order.info.address.postalCode,
        city: order.info.address.city,
        administrativeArea: order.info.address.administrativeArea,
        dependentLocality: order.info.address.dependentLocality,
        province: order.info.address.province,
      },
      status: order.status,
      productsAmount: order.productsAmount,
      shippingCosts: order.shippingCosts,
      deliveryOption: order.deliveryOption,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt.toISOString(),
    } as const;
  }

  toDomain(
    customer: Customer | undefined,
    products: CarPart[],
    order: ReturnType<typeof this.toPersistance>
  ): Order {
    return new Order(
      {
        customer,
        products,
        orderDraftId: order.orderDraftId,
        info: new ShippingInfo({
          firstName: new FirstName(order.firstName),
          lastName: new LastName(order.lastName),
          email: new Email(order.email),
          details: order.details
            ? new ShippingDetails(order.details)
            : undefined,
          address: new ShippingAddress(order.address),
        }),
        deliveryOption: order.deliveryOption,
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: new Date(order.createdAt),
        productsAmount: order.productsAmount,
        shippingCosts: order.shippingCosts,
      },
      order._id
    );
  }
}
