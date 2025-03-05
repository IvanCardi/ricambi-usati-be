import { Email } from "../email";
import { CompanyCustomer } from "./companyCustomer";
import { CompanyName } from "./companyName";
import { CompanySdi } from "./companySdi";
import { CompanyVat } from "./companyVat";

describe("Company Customer Tests", () => {
  test("Should set discount to 0 when creating a new company customer", () => {
    const customer = new CompanyCustomer({
      email: new Email("email@email.com"),
      isAutomotive: true,
      name: new CompanyName("company"),
      pec: new Email("email@email.com"),
      sdi: new CompanySdi("1234567"),
      vat: new CompanyVat("IT123456789"),
    });

    expect(customer.discount?.valueOf()).toEqual(0);
  });
});
