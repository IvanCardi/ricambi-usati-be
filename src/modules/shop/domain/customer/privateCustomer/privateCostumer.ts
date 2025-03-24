import { Email, Entity } from "../../../../../shared";
import { Customer } from "../customer";
import { FirstName } from "./firstName";
import { LastName } from "./lastName";

export type PrivateCostumerProps = {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  userId: string;
};

export class PrivateCostumer
  extends Entity<PrivateCostumerProps>
  implements Customer
{
  public constructor(props: PrivateCostumerProps, id?: string) {
    super(props, id);
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

  get userId() {
    return this.props.userId;
  }
}
