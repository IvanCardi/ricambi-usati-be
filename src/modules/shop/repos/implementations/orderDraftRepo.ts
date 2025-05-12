import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { OrderDraft } from "../../domain/orderDraft/orderDraft";
import { OrderDraftMap, OrderDraftPM } from "../../mappers/orderDraftMap";
import { ICarPartRepo } from "../carPartRepo";
import { ICustomerRepo } from "../customerRepo";
import { IOrderDraftRepo } from "../orderDraftRepo";

export class OrderDraftRepo implements IOrderDraftRepo {
  private collection = "order_drafts";

  constructor(
    private customerRepo: ICustomerRepo,
    private carPartRepo: ICarPartRepo
  ) {}

  async save(orderDraft: OrderDraft): Promise<void> {
    const raw = OrderDraftMap.toPersistance(orderDraft);

    if (await MONGO_DB.findOne({ _id: orderDraft.id }, this.collection)) {
      await MONGO_DB.replace({ _id: orderDraft.id }, raw, this.collection);
    } else {
      await MONGO_DB.save(raw, this.collection);
    }
  }

  async getById(id: string): Promise<OrderDraft | undefined> {
    const raw = (await MONGO_DB.findOne(
      { _id: id },
      this.collection
    )) as OrderDraftPM;

    if (!raw) {
      return undefined;
    }

    const customer = raw.customerId
      ? await this.customerRepo.getById(raw.customerId)
      : undefined;
    const carParts = await this.carPartRepo.getByIds(raw.products);

    if (carParts.length === raw.products.length) {
      return OrderDraftMap.toDomain(raw, carParts, customer);
    }

    throw new Error("error during order getById");
  }
}
