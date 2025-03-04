import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Car } from "../../domain/carPart/car";
import { carMap } from "../../mappers";
import { ICarRepo } from "../carRepo";

export class CarRepo implements ICarRepo {
  private collection = "cars";
  private mongoDb = MONGO_DB;

  async getAll(): Promise<Car[]> {
    const raws = (await this.mongoDb.find({}, this.collection)) as any;

    return raws.map((r: any) => carMap.toDomain(r));
  }

  async getById(id: string): Promise<Car | undefined> {
    const raw = await this.mongoDb.findOne({ _id: id }, this.collection);

    return raw && carMap.toDomain(raw);
  }
}
