import { Customer } from "../domain/customer/customer";

export interface ICustomerRepo {
  save(customer: Customer): Promise<void>;
}
