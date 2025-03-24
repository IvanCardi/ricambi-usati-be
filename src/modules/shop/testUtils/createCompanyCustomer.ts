import { networkInterfaces } from "node:os";
import {
  CompanyCustomer,
  CompanyCustomerProps,
} from "../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../domain/customer/companyCustomer/companyVat";
import { Email } from "../../../shared";

export function createCompanyCustomer(
  props: Partial<CompanyCustomerProps>
): CompanyCustomer {
  return new CompanyCustomer({
    discount: props.discount ?? new CompanyDiscount(0),
    email: props.email ?? new Email("comp@cust.com"),
    isAutomotive: props.isAutomotive ?? false,
    name: props.name ?? new CompanyName("Company"),
    pec: props.pec ?? new Email("pec@pec.com"),
    sdi: props.sdi ?? new CompanySdi("1234567"),
    vat: props.vat ?? new CompanyVat("01234567890"),
    userId: props.userId ?? "user_id",
  });
}
