import { Email, FirstName, LastName, ValueObject } from "../../../../shared";
import { ShippingAddress } from "./shippingAddress";
import { ShippingDetails } from "./shippingDetails";

export type ShippingInfoProps = {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  address: ShippingAddress;
  details?: ShippingDetails;
};

export class ShippingInfo extends ValueObject<ShippingInfoProps> {
  public constructor(props: ShippingInfoProps) {
    super(props);
  }

  get firstName() {
    return this.props.firstName.toString();
  }

  get lastName() {
    return this.props.lastName.toString();
  }

  get email() {
    return this.props.email.toString();
  }

  get address() {
    return this.props.address;
  }

  get details() {
    return this.props.details?.toString();
  }
}
