import { ValueObject } from "../../../../shared";

export type ShippingAddressProps = {
  firstName: string;
  lastName: string;
  streetName: string;
  streetName2: string | undefined;
  city: string | undefined;
  country: string;
  province: string | undefined;
  administrativeArea: string | undefined;
  dependentLocality: string | undefined;
  postalCode: string | undefined;
};

export class ShippingAddress extends ValueObject<ShippingAddressProps> {
  public constructor(props: ShippingAddressProps) {
    super(props);
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get streetName() {
    return this.props.streetName;
  }

  get country() {
    return this.props.country;
  }

  get streetName2() {
    return this.props.streetName2;
  }

  get city() {
    return this.props.city;
  }

  get province() {
    return this.props.province;
  }

  get administrativeArea() {
    return this.props.administrativeArea;
  }

  get dependentLocality() {
    return this.props.dependentLocality;
  }

  get postalCode() {
    return this.props.postalCode;
  }
}
