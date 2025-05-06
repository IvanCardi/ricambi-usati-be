import { Entity } from "../../../../shared";
import { OrderCannotBeShipped } from "../_errors/orderCannotBeShipped";
import { Address } from "../address/address";
import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { OrderStatus } from "./orderStatus";

export type OrderProps = {
  customer: Customer;
  products: CarPart[];
  address: Address;
  status: OrderStatus;
  createdAt: Date; // timestamp
  paymentId?: string;
};

export class Order extends Entity<OrderProps> {
  public constructor(props: OrderProps, id?: string) {
    super(props, id);

    this.props.createdAt = props.createdAt ?? new Date();
  }

  static create(props: {
    customer: Customer;
    products: CarPart[];
    address: Address;
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

  get street() {
    return this.props.address.street.toString();
  }

  get number() {
    return this.props.address.number.toString();
  }

  get zipCode() {
    return this.props.address.zipCode.toString();
  }

  get province() {
    return this.props.address.province.toString();
  }

  get city() {
    return this.props.address.city.toString();
  }

  get state() {
    return this.props.address.state.toString();
  }

  get status() {
    return this.props.status;
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

  setPaymentId(id: string) {
    this.props.status = "in payment";

    this.props.paymentId = id;
  }
}
