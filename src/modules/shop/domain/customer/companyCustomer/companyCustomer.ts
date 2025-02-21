import { Entity } from "../../../../../shared";
import { Email } from "../email";
import { CompanyName } from "./companyName";
import { CompanySdi } from "./companySdi";
import { CompanyVat } from "./companyVat";

export type CompanyCustomerProps = {
  name: CompanyName;
  vat: CompanyVat;
  isAutomotive: boolean;
  email: Email;
  pec: Email;
  sdi: CompanySdi;
};

export class CompanyCustomer extends Entity<CompanyCustomerProps> {
  public constructor(props: CompanyCustomerProps, id?: string) {
    super(props, id);
  }
}
