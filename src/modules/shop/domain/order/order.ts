import { Entity } from "../../../../shared";
import { OrderCannotBeShipped } from "../_errors/orderCannotBeShipped";
import { ShippingInfoNotDefined } from "../_errors/shippingInfoNotDefined";
import { CarPart } from "../carPart/carPart";
import { Customer } from "../customer/customer";
import { OrderDraft } from "../orderDraft/orderDraft";
import { ShippingCostsCalculator } from "../services/shippingCostsCalculator";
import { ShippingInfo } from "../shippingInfo/shippingInfo";
import { DeliveryOption } from "./orderDeliveryOptions";
import { PaymentMethod } from "./orderPaymentMethods";
import { OrderStatus } from "./orderStatus";

export type OrderProps = {
  customer?: Customer;
  orderDraftId: string;
  products: CarPart[];
  info: ShippingInfo;
  status: OrderStatus;
  createdAt: Date; // timestamp
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  productsAmount: number;
  shippingCosts: number;
};

export class Order extends Entity<OrderProps> {
  public constructor(props: OrderProps, id?: string) {
    super(props, id);

    this.props.createdAt = props.createdAt ?? new Date();
  }

  static create({
    deliveryOption,
    orderDraft,
    paymentMethod,
    oldOrderId,
  }: {
    orderDraft: OrderDraft;
    deliveryOption: DeliveryOption;
    paymentMethod: PaymentMethod;
    oldOrderId?: string;
  }): Order {
    if (!orderDraft.info) {
      throw new ShippingInfoNotDefined();
    }

    return new Order(
      {
        orderDraftId: orderDraft.id,
        createdAt: new Date(),
        deliveryOption,
        info: orderDraft.info,
        paymentMethod,
        products: orderDraft.products,
        productsAmount: orderDraft.getTotalPrice(),
        shippingCosts: new ShippingCostsCalculator(orderDraft).calculate(),
        status: "in payment",
        customer: orderDraft.customer,
      },
      oldOrderId
    );
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get customer() {
    return this.props.customer;
  }

  get products() {
    return this.props.products;
  }

  get info() {
    return this.props.info;
  }

  get status() {
    return this.props.status;
  }

  get deliveryOption() {
    return this.props.deliveryOption;
  }

  get paymentMethod() {
    return this.props.paymentMethod;
  }

  get productsAmount() {
    return this.props.productsAmount;
  }

  get shippingCosts() {
    return this.props.shippingCosts;
  }

  get orderDraftId() {
    return this.props.orderDraftId;
  }

  setStatus(status: OrderStatus) {
    this.props.status = status;
  }

  markAsShipped() {
    if (this.status !== "paid") {
      throw new OrderCannotBeShipped();
    }

    this.props.status = "shipped";
  }
}
