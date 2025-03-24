import { Email } from "../../../shared";
import { CompanyCustomer } from "../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../domain/customer/companyCustomer/companyVat";
import { Customer } from "../domain/customer/customer";
import { FirstName } from "../domain/customer/privateCustomer/firstName";
import { LastName } from "../domain/customer/privateCustomer/lastName";
import { PrivateCostumer } from "../domain/customer/privateCustomer/privateCostumer";

export class CustomerMap {
  toPersistance(customer: Customer) {
    if (customer instanceof PrivateCostumer) {
      return {
        _id: customer.id,
        type: "private",
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        _id: customer.id,
        type: "company",
        name: customer.name,
        email: customer.email,
        pec: customer.pec,
        sdi: customer.sdi,
        vat: customer.vat,
        isAutomotive: customer.isAutomotive,
        discount: customer.discount,
      } as const;
    }

    throw new Error("invalid customer in map");
  }

  toDomain(customer: ReturnType<typeof this.toPersistance>): Customer {
    if (customer.type === "private") {
      return new PrivateCostumer(
        {
          email: new Email(customer.email),
          firstName: new FirstName(customer.firstName),
          lastName: new LastName(customer.lastName),
        },
        customer._id
      );
    }

    if (customer.type === "company") {
      return new CompanyCustomer(
        {
          email: new Email(customer.email),
          name: new CompanyName(customer.name),
          vat: new CompanyVat(customer.vat),
          sdi: new CompanySdi(customer.sdi),
          pec: new Email(customer.pec),
          isAutomotive: customer.isAutomotive,
          discount: new CompanyDiscount(customer.discount),
        },
        customer._id
      );
    }

    throw new Error("invalid customer in map");
  }

  toDTO(customer: Customer) {
    if (customer instanceof PrivateCostumer) {
      return {
        id: customer.id,
        type: "private",
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        id: customer.id,
        type: "company",
        name: customer.name,
        email: customer.email,
        pec: customer.pec,
        sdi: customer.sdi,
        vat: customer.vat,
        isAutomotive: customer.isAutomotive,
        discount: customer.discount,
      } as const;
    }

    throw new Error("invalid customer in map");
  }
}
