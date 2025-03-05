import { Car } from "../domain/carPart/car";
import { CarPart } from "../domain/carPart/carPart";
import { CarPartCategory } from "../domain/carPart/carPartCategory";
import { CarPartDescription } from "../domain/carPart/carPartDescription";
import { CarPartName } from "../domain/carPart/carPartName";
import { CarPartNumber } from "../domain/carPart/carPartNumber";
import { CarPartNumbers } from "../domain/carPart/carPartNumbers";
import { CarPartPrice } from "../domain/carPart/carPartPrice";
import { CarPartWarranty } from "../domain/carPart/carPartWarranty";
import { CompanyCustomer } from "../domain/customer/companyCustomer/companyCustomer";
import { CompanyName } from "../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../domain/customer/companyCustomer/companyVat";
import { Customer } from "../domain/customer/customer";
import { Email } from "../domain/customer/email";
import { FirstName } from "../domain/customer/privateCustomer/firstName";
import { LastName } from "../domain/customer/privateCustomer/lastName";
import { PrivateCostumer } from "../domain/customer/privateCustomer/privateCostumer";

export class CustomerMap {
  toPersistance(customer: Customer) {
    if (customer instanceof PrivateCostumer) {
      return {
        _id: customer.id,
        type: "private",
        firstName: customer.firstName.toString(),
        lastName: customer.lastName.toString(),
        email: customer.email.toString(),
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        _id: customer.id,
        type: "company",
        name: customer.name.toString(),
        email: customer.email.toString(),
        pec: customer.pec.toString(),
        sdi: customer.sdi.toString(),
        vat: customer.vat.toString(),
        isAutomotive: customer.isAutomotive,
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
        firstName: customer.firstName.toString(),
        lastName: customer.lastName.toString(),
        email: customer.email.toString(),
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        id: customer.id,
        type: "company",
        name: customer.name.toString(),
        email: customer.email.toString(),
        pec: customer.pec.toString(),
        sdi: customer.sdi.toString(),
        vat: customer.vat.toString(),
        isAutomotive: customer.isAutomotive,
      } as const;
    }

    throw new Error("invalid customer in map");
  }
}
