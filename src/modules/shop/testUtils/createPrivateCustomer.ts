import { Email } from "../../../shared";
import { FirstName } from "../domain/customer/privateCustomer/firstName";
import { LastName } from "../domain/customer/privateCustomer/lastName";
import {
  PrivateCostumer,
  PrivateCostumerProps,
} from "../domain/customer/privateCustomer/privateCostumer";

export function createPrivateCustomer(
  props: Partial<PrivateCostumerProps>
): PrivateCostumer {
  return new PrivateCostumer({
    email: props.email ?? new Email("priv@cust.com"),
    firstName: props.firstName ?? new FirstName("private"),
    lastName: props.lastName ?? new LastName("customer"),
    userId: props.userId ?? "user_id",
  });
}
