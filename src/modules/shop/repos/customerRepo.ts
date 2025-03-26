import { Customer } from "../domain/customer/customer";

export interface ICustomerRepo {
  getByUserId(userId: string): Promise<Customer | undefined>;
  getAll(): Promise<Customer[]>;
  getById(id: string): Promise<Customer | undefined>;
  save(customer: Customer): Promise<void>;
}
