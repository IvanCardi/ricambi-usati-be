import { UseCase } from "../../../../shared";
import { Customer } from "../../domain/customer/customer";
import { ICustomerRepo } from "../../repos/customerRepo";

export class GetCustomers implements UseCase<void, Customer[]> {
  constructor(private customerRepo: ICustomerRepo) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customerRepo.getAll();

    return customers;
  }
}
