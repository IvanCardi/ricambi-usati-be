import { Address, AddressProps } from "../domain/address/address";
import { AddressCity } from "../domain/address/addressCity";
import { AddressNumber } from "../domain/address/addressNumber";
import { AddressProvince } from "../domain/address/addressProvince";
import { AddressState } from "../domain/address/addressState";
import { AddressStreet } from "../domain/address/addressStreet";
import { AddressZipCode } from "../domain/address/addressZipCode";

export function createAddress(props: Partial<AddressProps>): Address {
  return new Address({
    city: props.city ?? new AddressCity("city"),
    state: props.state ?? new AddressState("state"),
    zipCode: props.zipCode ?? new AddressZipCode("zipCode"),
    province: props.province ?? new AddressProvince("province"),
    number: props.number ?? new AddressNumber("number"),
    street: props.street ?? new AddressStreet("street"),
  });
}
