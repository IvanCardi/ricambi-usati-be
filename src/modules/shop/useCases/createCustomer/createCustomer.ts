import { Email, UseCase } from "../../../../shared";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../../domain/customer/companyCustomer/companyVat";
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
      pec: string;
      sdi: string;
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
        pec: new Email(input.pec),
        isAutomotive: input.isAutomotive,
        name: new CompanyName(input.name),
        sdi: new CompanySdi(input.sdi),
        vat: new CompanyVat(input.vat),
        discount: new CompanyDiscount(0),
      });
    }

    if (!customer) {
      throw new InvalidCustomerType();
    }

    await this.customerRepo.save(customer);
  }
}
