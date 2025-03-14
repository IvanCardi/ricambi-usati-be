import { CompanyCustomer } from "../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../domain/customer/companyCustomer/companyVat";
import { Customer } from "../domain/customer/customer";
import { Email } from "../domain/customer/email";
import { FirstName } from "../domain/customer/privateCustomer/firstName";
import { LastName } from "../domain/customer/privateCustomer/lastName";
import { PrivateCostumer } from "../domain/customer/privateCustomer/privateCostumer";
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
      userId: order.userId,
      products: order.products,
      street: order.street,
      number: order.number,
      zipCode: order.zipCode,
      province: order.province,
      city: order.city,
      state: order.state,
      status: order.status,
    } as const;
  }

  toDomain(order: ReturnType<typeof this.toPersistance>): Order {
    return new Order(
      {
        userId: order.userId,
        products: order.products,
        address: new OrderAddress({
          city: new OrderAddressCity(order.city),
          number: new OrderAddressNumber(order.number),
          province: new OrderAddressProvince(order.province),
          state: new OrderAddressState(order.state),
          street: new OrderAddressStreet(order.street),
          zipCode: new OrderAddressZipCode(order.zipCode),
        }),
        status: order.status,
      },
      order._id
    );
  }
}
