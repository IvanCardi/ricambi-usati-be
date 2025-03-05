import { Customer } from "../domain/customer/customer";

export interface ICustomerRepo {
  getAll(): Promise<Customer[]>;
  getById(id: string): Promise<Customer | undefined>;
  save(customer: Customer): Promise<void>;
}
