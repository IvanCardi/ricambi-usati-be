import { Entity } from "../../../../../shared";
import { Customer } from "../customer";
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

export class CompanyCustomer
  extends Entity<CompanyCustomerProps>
  implements Customer
{
  public constructor(props: CompanyCustomerProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get vat() {
    return this.props.vat;
  }

  get email() {
    return this.props.email;
  }

  get isAutomotive() {
    return this.props.isAutomotive;
  }

  get pec() {
    return this.props.pec;
  }

  get sdi() {
    return this.props.sdi;
  }
}
