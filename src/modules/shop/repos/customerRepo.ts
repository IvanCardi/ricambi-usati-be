import { Customer } from "../domain/customer/customer";

export interface ICustomerRepo {
  getAll(): Promise<Customer[]>;
  save(customer: Customer): Promise<void>;
}
