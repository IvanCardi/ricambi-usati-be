import { ValueObject } from "../../../../shared";
import { OrderAddressCity } from "./orderAddressCity";
import { OrderAddressNumber } from "./orderAddressNumber";
import { OrderAddressProvince } from "./orderAddressProvince";
import { OrderAddressState } from "./orderAddressState";
import { OrderAddressStreet } from "./orderAddressStreet";
import { OrderAddressZipCode } from "./orderAddressZipCode";

export type OrderAddressProps = {
  street: OrderAddressStreet;
  number: OrderAddressNumber;
  zipCode: OrderAddressZipCode;
  province: OrderAddressProvince;
  city: OrderAddressCity;
  state: OrderAddressState;
};

export class OrderAddress extends ValueObject<OrderAddressProps> {
  public constructor(props: OrderAddressProps) {
    super(props);
  }

  get street() {
    return this.props.street.toString();
  }

  get number() {
    return this.props.number.toString();
  }

  get zipCode() {
    return this.props.zipCode.toString();
  }

  get province() {
    return this.props.province.toString();
  }

  get city() {
    return this.props.city.toString();
  }

  get state() {
    return this.props.state.toString();
  }
}
