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
import { createAddress } from "./createAddress";
import { TaxCode } from "../domain/customer/companyCustomer/taxCode";

export function createCompanyCustomer(
  props: Partial<CompanyCustomerProps>
): CompanyCustomer {
  return new CompanyCustomer({
    discount: props.discount ?? new CompanyDiscount(0),
    email: props.email ?? new Email("comp@cust.com"),
    isAutomotive: props.isAutomotive ?? false,
    name: props.name ?? new CompanyName("Company"),
    billingAddress: props.billingAddress ?? createAddress({}),
    shippingAddress: props.shippingAddress ?? createAddress({}),
    sdi: props.sdi ?? new CompanySdi("1234567"),
    vat: props.vat ?? new CompanyVat("01234567890"),
    userId: props.userId ?? "user_id",
    taxCode: props.taxCode ?? new TaxCode("CRDVNI96S16D423Y"),
  });
}
