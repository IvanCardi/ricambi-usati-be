import { ValueObject } from "../../../../shared";

export type ShippingAddressProps = {
  firstName: string;
  lastName: string;
  streetName: string;
  streetName2?: string;
  city?: string;
  country: string;
  province?: string;
  administrativeArea?: string;
  dependentLocality?: string;
  postalCode?: string;
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
