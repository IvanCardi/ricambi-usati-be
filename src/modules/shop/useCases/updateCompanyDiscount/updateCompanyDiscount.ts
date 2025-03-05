import { UseCase } from "../../../../shared";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { ICustomerRepo } from "../../repos/customerRepo";
import { CustomerNotFound } from "../_errors/customerNotFound";
import { DiscountOnPrivateCustomerNotPermitted } from "../_errors/discountOnPrivateCustomerNotPermitted";

export type UpdateCompanyDiscountInput = {
  customerId: string;
  discount: number;
};

export class UpdateCompanyDiscount
  implements UseCase<UpdateCompanyDiscountInput, any>
{
  constructor(private customerRepo: ICustomerRepo) {}

  async execute(input: UpdateCompanyDiscountInput): Promise<any> {
    const customer = await this.customerRepo.getById(input.customerId);

    if (!customer) {
      throw new CustomerNotFound();
    }

    if (!(customer instanceof CompanyCustomer)) {
      throw new DiscountOnPrivateCustomerNotPermitted();
    }

    customer.setDiscount(input.discount);

    await this.customerRepo.save(customer);
  }
}
