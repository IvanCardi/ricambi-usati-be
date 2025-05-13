import { Email, FirstName, LastName } from "../../../shared";
import { CarPart } from "../domain/carPart/carPart";
import { Customer } from "../domain/customer/customer";
import { OrderDraft } from "../domain/orderDraft/orderDraft";
import { ShippingAddress } from "../domain/shippingInfo/shippingAddress";
import { ShippingDetails } from "../domain/shippingInfo/shippingDetails";
import { ShippingInfo } from "../domain/shippingInfo/shippingInfo";

export type OrderDraftPM = {
  _id: string;
  products: string[];
  customerId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  details: string | undefined;
  address:
    | {
        streetName: string;
        streetName2: string | undefined;
        country: string;
        city: string | undefined;
        province: string | undefined;
        administrativeArea: string | undefined;
        dependentLocality: string | undefined;
        postalCode: string | undefined;
      }
    | undefined;
};

export class OrderDraftMap {
  static toPersistance(orderDraft: OrderDraft): OrderDraftPM {
    return {
      _id: orderDraft.id,
      customerId: orderDraft.customer?.id,
      products: orderDraft.products.map((p) => p.id),
      firstName: orderDraft.info?.firstName,
      lastName: orderDraft.info?.lastName,
      email: orderDraft.info?.email,
      details: orderDraft.info?.details,
      address: orderDraft.info
        ? {
            country: orderDraft.info.address.country,
            streetName: orderDraft.info.address.streetName,
            streetName2: orderDraft.info.address.streetName2,
            postalCode: orderDraft.info.address.postalCode,
            city: orderDraft.info.address.city,
            administrativeArea: orderDraft.info.address.administrativeArea,
            dependentLocality: orderDraft.info.address.dependentLocality,
            province: orderDraft.info.address.province,
          }
        : undefined,
    };
  }

  static toDomain(
    orderDraft: OrderDraftPM,
    products: CarPart[],
    customer?: Customer
  ): OrderDraft {
    return new OrderDraft(
      {
        products,
        customer,
        info:
          orderDraft.firstName &&
          orderDraft.lastName &&
          orderDraft.email &&
          orderDraft.address
            ? new ShippingInfo({
                firstName: new FirstName(orderDraft.firstName),
                lastName: new LastName(orderDraft.lastName),
                email: new Email(orderDraft.email),
                details: orderDraft.details
                  ? new ShippingDetails(orderDraft.details)
                  : undefined,
                address: new ShippingAddress(orderDraft.address),
              })
            : undefined,
      },
      orderDraft._id
    );
  }

  /*  static toDTO(orderDraft: OrderDraft) {}

  static toQueryModel(orderDraft: OrderDraft): OrderDraftQM {} */
}
