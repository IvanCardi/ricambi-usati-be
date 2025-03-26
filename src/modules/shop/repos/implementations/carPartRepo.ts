import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { CarPart } from "../../domain/carPart/carPart";
import { carPartMap } from "../../mappers";
import { OrderBy } from "../../useCases/getCarParts/getCarParts";
import { ICarPartRepo } from "../carPartRepo";

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
    filter: {
      brand?: string;
      model?: string;
      setup?: string;
      startYear?: number;
      endYear?: number;
    },
    order: OrderBy | undefined,
    page: number,
    limit: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }> {
    const query = {
      ...(filter.startYear && filter.endYear
        ? { carYear: { $gte: filter.startYear, $lte: filter.endYear } }
        : {}),
      ...(filter.brand ? { carBrand: filter.brand } : {}),
      ...(filter.model ? { carModel: filter.model } : {}),
      ...(filter.setup ? { carSetup: filter.setup } : {}),
    };

    let sortOptions: any = {};
    if (order === "price_asc") sortOptions.price = 1; // Sort by price ascending
    if (order === "price_desc") sortOptions.price = -1; // Sort by price descending

    const collection = await this.mongoDb.getCollection(this.collection);

    const raws = await collection
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalCount = await collection.countDocuments(query);

    return {
      totalPages: Math.ceil(totalCount / limit),
      carParts: raws.map((r) => carPartMap.toDomain(r as any)),
    };
  }

  async getByNumberAndPage(
    number: string,
    page: number,
    limit: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }> {
    const collection = await this.mongoDb.getCollection(this.collection);

    const query = { numbers: number };
    const raws = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalCount = await collection.countDocuments(query);

    return {
      totalPages: Math.ceil(totalCount / limit),
      carParts: raws.map((r) => carPartMap.toDomain(r as any)),
    };
  }
}
