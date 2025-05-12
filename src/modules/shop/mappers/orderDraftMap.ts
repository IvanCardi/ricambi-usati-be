import { CarPart } from "../domain/carPart/carPart";
import { Customer } from "../domain/customer/customer";
import { OrderDraft } from "../domain/orderDraft/orderDraft";

export type OrderDraftPM = {
  _id: string;
  products: string[];
  customerId: string | undefined;
};

export class OrderDraftMap {
  static toPersistance(orderDraft: OrderDraft): OrderDraftPM {
    return {
      _id: orderDraft.id,
      customerId: orderDraft.customer?.id,
      products: orderDraft.products.map((p) => p.id),
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
      },
      orderDraft._id
    );
  }

  /*  static toDTO(orderDraft: OrderDraft) {}

  static toQueryModel(orderDraft: OrderDraft): OrderDraftQM {} */
}
