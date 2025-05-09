import { Email, UseCase } from "../../../../shared";
import { Address } from "../../domain/address/address";
import { AddressCity } from "../../domain/address/addressCity";
import { AddressNumber } from "../../domain/address/addressNumber";
import { AddressProvince } from "../../domain/address/addressProvince";
import { AddressState } from "../../domain/address/addressState";
import { AddressStreetName } from "../../domain/address/addressStreet";
import { AddressZipCode } from "../../domain/address/addressZipCode";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../../domain/customer/companyCustomer/companyVat";
import { TaxCode } from "../../domain/customer/companyCustomer/taxCode";
import { Customer } from "../../domain/customer/customer";
import { FirstName } from "../../domain/customer/privateCustomer/firstName";
import { LastName } from "../../domain/customer/privateCustomer/lastName";
import { PrivateCostumer } from "../../domain/customer/privateCustomer/privateCostumer";
import { ICustomerRepo } from "../../repos/customerRepo";
import { InvalidCustomerType } from "../_errors/invalidCustomerType";

export type CreateCustomerInput =
  | {
      type: "private";
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
    }
  | {
      type: "company";
      userId: string;
      name: string;
      vat: string;
      isAutomotive: boolean;
      email: string;
      taxCode: string;
      sdi: string;
      billingAddress: {
        street: string;
        city: string;
        province: string;
        zipCode: string;
        number: string;
        state: string;
      };
      shippingAddress: {
        street: string;
        city: string;
        province: string;
        zipCode: string;
        number: string;
        state: string;
      };
    };

export class CreateCustomer implements UseCase<CreateCustomerInput, void> {
  constructor(private customerRepo: ICustomerRepo) {}

  async execute(input: CreateCustomerInput): Promise<void> {
    let customer: Customer | undefined;

    if (input.type === "private") {
      customer = new PrivateCostumer({
        userId: input.userId,
        email: new Email(input.email),
        firstName: new FirstName(input.firstName),
        lastName: new LastName(input.lastName),
      });
    }

    if (input.type === "company") {
      customer = new CompanyCustomer({
        userId: input.userId,
        email: new Email(input.email),
        isAutomotive: input.isAutomotive,
        name: new CompanyName(input.name),
        sdi: new CompanySdi(input.sdi),
        vat: new CompanyVat(input.vat),
        discount: new CompanyDiscount(0),
        billingAddress: new Address({
          street: new AddressStreetName(input.billingAddress.street),
          city: new AddressCity(input.billingAddress.city),
          province: new AddressProvince(input.billingAddress.province),
          zipCode: new AddressZipCode(input.billingAddress.zipCode),
          number: new AddressNumber(input.billingAddress.number),
          state: new AddressState(input.billingAddress.state),
        }),
        shippingAddress: new Address({
          street: new AddressStreetName(input.shippingAddress.street),
          city: new AddressCity(input.shippingAddress.city),
          province: new AddressProvince(input.shippingAddress.province),
          zipCode: new AddressZipCode(input.billingAddress.zipCode),
          number: new AddressNumber(input.billingAddress.number),
          state: new AddressState(input.billingAddress.state),
        }),
        taxCode: new TaxCode(input.taxCode),
      });
    }

    if (!customer) {
      throw new InvalidCustomerType();
    }

    await this.customerRepo.save(customer);
  }
}
