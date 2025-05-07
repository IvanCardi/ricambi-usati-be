import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Order } from "../../domain/order/order";
import { orderMap } from "../../mappers";
import { ICarPartRepo } from "../carPartRepo";
import { ICustomerRepo } from "../customerRepo";
import { IOrderRepo } from "../orderRepo";

export class OrderRepo implements IOrderRepo {
  private collection = "orders";
  private mongoDb = MONGO_DB;

  constructor(
    private customerRepo: ICustomerRepo,
    private carPartRepo: ICarPartRepo
  ) {}

  async getById(id: string): Promise<Order | undefined> {
    const raw = (await this.mongoDb.findOne(
      { _id: id },
      this.collection
    )) as ReturnType<typeof orderMap.toPersistance>;

    if (!raw) {
      return undefined;
    }

    const customer = await this.customerRepo.getById(raw.customerId);
    const carParts = await this.carPartRepo.getByIds(raw.products);

    if (customer && carParts.length === raw.products.length) {
      return orderMap.toDomain(raw, customer, carParts);
    }

    throw new Error("error during order getById");
  }

  async getByPaymentId(id: string): Promise<Order | undefined> {
    const raw = (await this.mongoDb.findOne(
      { paymentId: id },
      this.collection
    )) as ReturnType<typeof orderMap.toPersistance>;

    if (!raw) {
      return undefined;
    }

    const customer = await this.customerRepo.getById(raw.customerId);
    const carParts = await this.carPartRepo.getByIds(raw.products);

    if (customer && carParts.length === raw.products.length) {
      return orderMap.toDomain(raw, customer, carParts);
    }

    throw new Error("error during order getByPaymentId");
  }

  async save(order: Order): Promise<void> {
    const raw = orderMap.toPersistance(order);

    if (await this.getById(order.id)) {
      await this.mongoDb.replace({ _id: raw._id }, raw, this.collection);
    } else {
      await this.mongoDb.save(raw, this.collection);
    }
  }

  async getAll(): Promise<Order[]> {
    const raws = (await this.mongoDb.find({}, this.collection)) as ReturnType<
      typeof orderMap.toPersistance
    >[];

    const orders: Order[] = [];

    for (const raw of raws) {
      const customer = await this.customerRepo.getById(raw.customerId);
      const carParts = await this.carPartRepo.getByIds(raw.products);

      if (customer && carParts.length === raw.products.length) {
        orders.push(orderMap.toDomain(raw, customer, carParts));
      }
    }

    return orders;
  }
}
