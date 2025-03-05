import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Customer } from "../../domain/customer/customer";
import { customerMap } from "../../mappers";
import { ICustomerRepo } from "../customerRepo";

export class CustomerRepo implements ICustomerRepo {
  private collection = "customers";
  private mongoDb = MONGO_DB;

  async getAll(): Promise<Customer[]> {
    const raws = (await this.mongoDb.find({}, this.collection)) as ReturnType<
      typeof customerMap.toPersistance
    >[];

    return raws.map((r) => customerMap.toDomain(r));
  }

  async save(customer: Customer): Promise<void> {
    const raw = customerMap.toPersistance(customer);

    await this.mongoDb.save(raw, this.collection);
  }
}
