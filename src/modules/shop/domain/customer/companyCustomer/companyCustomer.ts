import { Entity, Email } from "../../../../../shared";
import { DiscountOnNonAutomotiveComponyNotPermitted } from "../../_errors/discountOnNonAutomotiveComponyNotPermitted";
import { Customer } from "../customer";
import { CompanyDiscount } from "./companyDiscount";
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
  discount: CompanyDiscount;
  userId: string;
};

export class CompanyCustomer
  extends Entity<CompanyCustomerProps>
  implements Customer
{
  public constructor(props: CompanyCustomerProps, id?: string) {
    super(props, id);

    if (!this.isAutomotive && this.discount !== 0) {
      throw new DiscountOnNonAutomotiveComponyNotPermitted();
    }
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name.toString();
  }

  get vat() {
    return this.props.vat.toString();
  }

  get email() {
    return this.props.email.toString();
  }

  get isAutomotive() {
    return this.props.isAutomotive;
  }

  get pec() {
    return this.props.pec.toString();
  }

  get sdi() {
    return this.props.sdi.toString();
  }

  get discount() {
    return this.props.discount.valueOf();
  }

  setDiscount(discount: number) {
    if (!this.isAutomotive && discount !== 0) {
      throw new DiscountOnNonAutomotiveComponyNotPermitted();
    }

    this.props.discount = new CompanyDiscount(discount);
  }
}
