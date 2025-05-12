import { Address, AddressProps } from "../common-classes/address/Address";
import { AddressCity } from "../common-classes/address/AddressCity";
import { AddressNumber } from "../common-classes/address/AddressNumber";
import { AddressProvince } from "../common-classes/address/AddressProvince";
import { AddressStreet } from "../common-classes/address/AddressStreet";
import { AddressZipCode } from "../common-classes/address/AddressZipCode";

export function createAddress(props: Partial<AddressProps>): Address {
  return new Address({
    city: props.city ?? new AddressCity("city"),
    number: props.number ?? new AddressNumber("10"),
    province: props.province ?? new AddressProvince("province"),
    street: props.street ?? new AddressStreet("street"),
    zipCode: props.zipCode ?? new AddressZipCode("zipCode"),
  });
}
