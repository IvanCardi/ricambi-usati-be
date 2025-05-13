import { Email, FirstName, LastName } from "../../../shared";
import {
  ShippingInfo,
  ShippingInfoProps,
} from "../domain/shippingInfo/shippingInfo";
import { createShippingAddress } from "./createShippingAddress";

export default function createShippingInfo(
  props: Partial<ShippingInfoProps>
): ShippingInfo {
  return new ShippingInfo({
    firstName: props.firstName ?? new FirstName("first_name"),
    lastName: props.lastName ?? new LastName("last_name"),
    email: props.email ?? new Email("email@email.com"),
    details: props.details,
    address: props.address ?? createShippingAddress({}),
  });
}
