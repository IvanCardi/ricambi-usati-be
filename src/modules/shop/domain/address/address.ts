import { ValueObject } from "../../../../shared";
import { AddressCity } from "./addressCity";
import { AddressNumber } from "./addressNumber";
import { AddressProvince } from "./addressProvince";
import { AddressState } from "./addressState";
import { AddressStreet } from "./addressStreet";
import { AddressZipCode } from "./addressZipCode";

export type AddressProps = {
  street: AddressStreet;
  number: AddressNumber;
  zipCode: AddressZipCode;
  province: AddressProvince;
  city: AddressCity;
  state: AddressState;
};

export class Address extends ValueObject<AddressProps> {
  public constructor(props: AddressProps) {
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
