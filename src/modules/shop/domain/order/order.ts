import { Entity } from "../../../../shared";
import { OrderCannotBeShipped } from "../_errors/orderCannotBeShipped";
import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { DeliveryOption } from "./orderDeliveryOptions";
import { OrderStatus } from "./orderStatus";
import { PaymentMethod } from "./orderPaymentMethods";
import { ShippingAddress } from "../shippingInfo/shippingAddress";

export type OrderProps = {
  customer: Customer;
  products: CarPart[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: Date; // timestamp
  email: string;
  details?: string;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
};

export class Order extends Entity<OrderProps> {
  public constructor(props: OrderProps, id?: string) {
    super(props, id);

    this.props.createdAt = props.createdAt ?? new Date();
  }

  static create(props: {
    customer: Customer;
    products: CarPart[];
    shippingAddress: ShippingAddress;
    email: string;
    details?: string;
    deliveryOption: DeliveryOption;
    paymentMethod: PaymentMethod;
  }): Order {
    return new Order({ ...props, createdAt: new Date(), status: "created" });
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

  get streetName() {
    return this.props.shippingAddress.streetName;
  }

  get country() {
    return this.props.shippingAddress.country;
  }

  get streetName2() {
    return this.props.shippingAddress.streetName2;
  }

  get city() {
    return this.props.shippingAddress.city;
  }

  get province() {
    return this.props.shippingAddress.province;
  }

  get administrativeArea() {
    return this.props.shippingAddress.administrativeArea;
  }

  get dependentLocality() {
    return this.props.shippingAddress.dependentLocality;
  }

  get postalCode() {
    return this.props.shippingAddress.postalCode;
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

  get email() {
    return this.props.email;
  }

  get details() {
    return this.props.details;
  }

  setStatus(status: OrderStatus) {
    this.props.status = status;
  }

  getTotalPrice(): number {
    const totalPrice = this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    if (
      this.customer instanceof CompanyCustomer &&
      this.customer.isAutomotive
    ) {
      return totalPrice - (totalPrice * this.customer.discount) / 100;
    }

    return totalPrice;
  }

  markAsShipped() {
    if (this.status !== "paid") {
      throw new OrderCannotBeShipped();
    }

    this.props.status = "shipped";
  }
}
