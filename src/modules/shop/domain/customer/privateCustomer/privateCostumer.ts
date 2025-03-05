import { Entity } from "../../../../../shared";
import { Customer } from "../customer";
import { Email } from "../email";
import { FirstName } from "./firstName";
import { LastName } from "./lastName";

export type PrivateCostumerProps = {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
};

export class PrivateCostumer
  extends Entity<PrivateCostumerProps>
  implements Customer
{
  public constructor(props: PrivateCostumerProps, id?: string) {
    super(props, id);
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }
}
