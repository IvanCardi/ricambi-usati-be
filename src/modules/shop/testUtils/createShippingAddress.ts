import {
  ShippingAddress,
  ShippingAddressProps,
} from "../domain/shippingAddress/shippingAddress";

export function createShippingAddress(
  props: Partial<ShippingAddressProps>
): ShippingAddress {
  return new ShippingAddress({
    firstName: props.firstName ?? "firstName",
    lastName: props.lastName ?? "lastName",
    streetName: props.streetName ?? "streetName",
    streetName2: props.streetName2 ?? "streetName2",
    city: props.city ?? "city",
    country: props.country ?? "country",
    province: props.province ?? "province",
    administrativeArea: props.administrativeArea ?? "administrativeArea",
    dependentLocality: props.dependentLocality ?? "dependentLocality",
    postalCode: props.postalCode ?? "postalCode",
  });
}
