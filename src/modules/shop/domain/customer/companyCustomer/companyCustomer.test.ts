import { Email } from "../../../../../shared";
import { DiscountOnNonAutomotiveComponyNotPermitted } from "../../_errors/discountOnNonAutomotiveComponyNotPermitted";
import { CompanyCustomer } from "./companyCustomer";
import { CompanyDiscount } from "./companyDiscount";
import { CompanyName } from "./companyName";
import { CompanySdi } from "./companySdi";
import { CompanyVat } from "./companyVat";

describe("Company Customer Tests", () => {
  test("Should throw error when setting a discount to a non automotive customer", () => {
    const customer = new CompanyCustomer({
      email: new Email("email@email.com"),
      isAutomotive: false,
      name: new CompanyName("company"),
      pec: new Email("email@email.com"),
      sdi: new CompanySdi("1234567"),
      vat: new CompanyVat("IT123456789"),
      discount: new CompanyDiscount(0),
    });

    expect(() => customer.setDiscount(10)).toThrow(
      DiscountOnNonAutomotiveComponyNotPermitted
    );
  });
});
