import { ValueObject } from "../../../domain/ValueObject";
import { AddressCity } from "./AddressCity";
import { AddressNumber } from "./AddressNumber";
import { AddressProvince } from "./AddressProvince";
import { AddressStreet } from "./AddressStreet";
import { AddressZipCode } from "./AddressZipCode";

export type AddressProps = {
  street: AddressStreet;
  number: AddressNumber;
  zipCode: AddressZipCode;
  province: AddressProvince;
  city: AddressCity;
};

export class Address extends ValueObject<AddressProps> {
  public constructor(props: AddressProps) {
    super(props);
  }

  static create(props: {
    street: string;
    number: string;
    zipCode: string;
    province: string;
    city: string;
  }): Address {
    return new Address({
      city: new AddressCity(props.city),
      number: new AddressNumber(props.number),
      province: new AddressProvince(props.province),
      street: new AddressStreet(props.street),
      zipCode: new AddressZipCode(props.zipCode),
    });
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

  getFullAddress(): string {
    return `${this.street} ${this.number}, ${this.city}, ${this.province}, ${this.zipCode}`;
  }
}
