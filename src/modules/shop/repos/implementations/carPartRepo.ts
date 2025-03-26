import { error } from "console";
import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { CarPart } from "../../domain/carPart/carPart";
import { carPartMap } from "../../mappers";
import { ICarPartRepo } from "../carPartRepo";
import { ICarRepo } from "../carRepo";

export class CarPartRepo implements ICarPartRepo {
  private collection = "car_parts";
  private mongoDb = MONGO_DB;

  async getById(id: string): Promise<CarPart | undefined> {
    const raw = (await this.mongoDb.findOne(
      { _id: id },
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>;

    if (!raw) {
      return undefined;
    }

    return carPartMap.toDomain(raw);
  }

  async getByIds(ids: string[]): Promise<CarPart[]> {
    const rawCarParts = (await this.mongoDb.findManyByIds(
      ids,
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    return rawCarParts.map((cp) => carPartMap.toDomain(cp));
  }

  async getAll(): Promise<CarPart[]> {
    const rawCarParts = (await this.mongoDb.find(
      {},
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    return rawCarParts.map((cp) => carPartMap.toDomain(cp));
  }

  async getByCar(id: string): Promise<CarPart[]> {
    const rawCarParts = (await this.mongoDb.find(
      { carId: id },
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    return rawCarParts.map((cp) => carPartMap.toDomain(cp));
  }

  async save(carPart: CarPart): Promise<void> {
    const raw = carPartMap.toPersistance(carPart);

    if (await this.getById(carPart.id)) {
      await this.mongoDb.replace({ _id: raw._id }, raw, this.collection);
    } else {
      await this.mongoDb.save(raw, this.collection);
    }
  }

  async saveAll(carParts: CarPart[]): Promise<void> {
    const rawParts = carParts.map(carPartMap.toPersistance);

    await this.mongoDb.saveMany(rawParts, this.collection);
  }

  async delete(id: string): Promise<void> {
    await this.mongoDb.deleteOne({ _id: id }, this.collection);
  }

  async getFilteredAndOrderedAndPaginated(
    filter: { [field: string]: string },
    order: "price_asc" | "price_desc" | undefined,
    page: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }> {
    const collection = await this.mongoDb.getCollection(this.collection);

    const raws = await collection
      .find(filter)
      .skip((page - 1) * 8)
      .limit(8)
      .toArray();

    const totalCount = await collection.countDocuments(filter);

    return {
      totalPages: Math.ceil(totalCount / 8),
      carParts: raws.map((r) => carPartMap.toDomain(r as any)),
    };
  }
}
