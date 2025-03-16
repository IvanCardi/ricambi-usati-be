import { Entity } from "../../../../shared";
import { CarPart } from "../carPart/carPart";
import { Customer } from "../customer/customer";
import { OrderAddress } from "./orderAddress";
import { OrderStatus } from "./orderStatus";

export type OrderProps = {
  customer: Customer;
  products: CarPart[];
  address: OrderAddress;
  status: OrderStatus;
};

export class Order extends Entity<OrderProps> {
  public constructor(props: OrderProps, id?: string) {
    super(props, id);
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
}
