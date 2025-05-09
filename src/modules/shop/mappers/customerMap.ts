import { Email } from "../../../shared";
import { Address } from "../domain/address/address";
import { AddressCity } from "../domain/address/addressCity";
import { AddressNumber } from "../domain/address/addressNumber";
import { AddressProvince } from "../domain/address/addressProvince";
import { AddressState } from "../domain/address/addressState";
import { AddressStreetName } from "../domain/address/addressStreet";
import { AddressZipCode } from "../domain/address/addressZipCode";
import { CompanyCustomer } from "../domain/customer/companyCustomer/companyCustomer";
import { CompanyDiscount } from "../domain/customer/companyCustomer/companyDiscount";
import { CompanyName } from "../domain/customer/companyCustomer/companyName";
import { CompanySdi } from "../domain/customer/companyCustomer/companySdi";
import { CompanyVat } from "../domain/customer/companyCustomer/companyVat";
import { TaxCode } from "../domain/customer/companyCustomer/taxCode";
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
        userId: customer.userId,
      } as const;
    }

    if (customer instanceof CompanyCustomer) {
      return {
        _id: customer.id,
        type: "company",
        name: customer.name,
        email: customer.email,
        billingAddress: {
          street: customer.billingAddress.street,
          number: customer.billingAddress.number,
          city: customer.billingAddress.city,
          province: customer.billingAddress.province,
          state: customer.billingAddress.state,
          zipCode: customer.billingAddress.zipCode,
        },
        shippingAddress: {
          street: customer.shippingAddress.street,
          number: customer.shippingAddress.number,
          city: customer.shippingAddress.city,
          province: customer.shippingAddress.province,
          state: customer.shippingAddress.state,
          zipCode: customer.shippingAddress.zipCode,
        },
        sdi: customer.sdi,
        vat: customer.vat,
        isAutomotive: customer.isAutomotive,
        discount: customer.discount,
        userId: customer.userId,
        taxCode: customer.taxCode,
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
          userId: customer.userId,
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
          billingAddress: new Address({
            street: new AddressStreetName(customer.billingAddress.street),
            city: new AddressCity(customer.billingAddress.city),
            province: new AddressProvince(customer.billingAddress.province),
            zipCode: new AddressZipCode(customer.billingAddress.zipCode),
            state: new AddressState(customer.billingAddress.state),
            number: new AddressNumber(customer.billingAddress.number),
          }),
          shippingAddress: new Address({
            street: new AddressStreetName(customer.shippingAddress.street),
            city: new AddressCity(customer.shippingAddress.city),
            province: new AddressProvince(customer.shippingAddress.province),
            zipCode: new AddressZipCode(customer.shippingAddress.zipCode),
            state: new AddressState(customer.shippingAddress.state),
            number: new AddressNumber(customer.shippingAddress.number),
          }),
          isAutomotive: customer.isAutomotive,
          discount: new CompanyDiscount(customer.discount),
          userId: customer.userId,
          taxCode: new TaxCode(customer.taxCode),
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
        billingAddress: {
          street: customer.billingAddress.street,
          number: customer.billingAddress.number,
          city: customer.billingAddress.city,
          province: customer.billingAddress.province,
          state: customer.billingAddress.state,
          zipCode: customer.billingAddress.zipCode,
        },
        shippingAddress: {
          street: customer.shippingAddress.street,
          number: customer.shippingAddress.number,
          city: customer.shippingAddress.city,
          province: customer.shippingAddress.province,
          state: customer.shippingAddress.state,
          zipCode: customer.shippingAddress.zipCode,
        },
        sdi: customer.sdi,
        vat: customer.vat,
        isAutomotive: customer.isAutomotive,
        discount: customer.discount,
      } as const;
    }

    throw new Error("invalid customer in map");
  }
}
