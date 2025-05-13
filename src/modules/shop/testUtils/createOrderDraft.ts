import { OrderDraft, OrderDraftProps } from "../domain/orderDraft/orderDraft";
import { createCarPart } from "./createCarPart";

export function createOrderDraft(props: Partial<OrderDraftProps>): OrderDraft {
  return new OrderDraft({
    products: props.products ?? [createCarPart({})],
    customer: props.customer,
    info: props.info,
  });
}
