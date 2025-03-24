import { Email } from "../../../../../shared";
import { DiscountOnNonAutomotiveComponyNotPermitted } from "../../_errors/discountOnNonAutomotiveComponyNotPermitted";
import { Address } from "../../address/address";
import { AddressCity } from "../../address/addressCity";
import { AddressNumber } from "../../address/addressNumber";
import { AddressProvince } from "../../address/addressProvince";
import { AddressState } from "../../address/addressState";
import { AddressStreet } from "../../address/addressStreet";
import { AddressZipCode } from "../../address/addressZipCode";
import { CompanyCustomer } from "./companyCustomer";
import { CompanyDiscount } from "./companyDiscount";
import { CompanyName } from "./companyName";
import { CompanySdi } from "./companySdi";
import { CompanyVat } from "./companyVat";
import { TaxCode } from "./taxCode";

describe("Company Customer Tests", () => {
  test("Should throw error when setting a discount to a non automotive customer", () => {
    const customer = new CompanyCustomer({
      email: new Email("email@email.com"),
      isAutomotive: false,
      name: new CompanyName("company"),
      billingAddress: new Address({
        street: new AddressStreet("street"),
        number: new AddressNumber("6"),
        state: new AddressState("it"),
        city: new AddressCity("city"),
        province: new AddressProvince("prov"),
        zipCode: new AddressZipCode("12345"),
      }),
      shippingAddress: new Address({
        street: new AddressStreet("street"),
        number: new AddressNumber("6"),
        state: new AddressState("it"),
        city: new AddressCity("city"),
        province: new AddressProvince("prov"),
        zipCode: new AddressZipCode("12345"),
      }),
      sdi: new CompanySdi("1234567"),
      vat: new CompanyVat("IT123456789"),
      discount: new CompanyDiscount(0),
      userId: "user_id",
      taxCode: new TaxCode("CRDVNI96S16D423Y"),
    });

    expect(() => customer.setDiscount(10)).toThrow(
      DiscountOnNonAutomotiveComponyNotPermitted
    );
  });
});
