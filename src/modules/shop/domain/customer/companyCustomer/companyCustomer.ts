import { Entity, Email } from "../../../../../shared";
import { DiscountOnNonAutomotiveComponyNotPermitted } from "../../_errors/discountOnNonAutomotiveComponyNotPermitted";
import { Address } from "../../address/address";
import { Customer } from "../customer";
import { CompanyDiscount } from "./companyDiscount";
import { CompanyName } from "./companyName";
import { CompanySdi } from "./companySdi";
import { CompanyVat } from "./companyVat";
import { TaxCode } from "./taxCode";

export type CompanyCustomerProps = {
  name: CompanyName;
  vat: CompanyVat;
  isAutomotive: boolean;
  email: Email;
  sdi: CompanySdi;
  discount: CompanyDiscount;
  userId: string;
  taxCode: TaxCode;
  billingAddress: Address;
  shippingAddress: Address;
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

  get sdi() {
    return this.props.sdi.toString();
  }

  get discount() {
    return this.props.discount.valueOf();
  }

  get billingAddress() {
    return this.props.billingAddress;
  }

  get shippingAddress() {
    return this.props.shippingAddress;
  }

  get taxCode() {
    return this.props.taxCode.toString();
  }

  setDiscount(discount: number) {
    if (!this.isAutomotive && discount !== 0) {
      throw new DiscountOnNonAutomotiveComponyNotPermitted();
    }

    this.props.discount = new CompanyDiscount(discount);
  }
}
