import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Order } from "../../domain/order/order";
import { orderMap } from "../../mappers";
import { IOrderRepo } from "../orderRepo";

export class OrderRepo implements IOrderRepo {
  private collection = "orders";
  private mongoDb = MONGO_DB;

  async save(order: Order): Promise<void> {
    const raw = orderMap.toPersistance(order);

    await this.mongoDb.save(raw, this.collection);
  }
}
