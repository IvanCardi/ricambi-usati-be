import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Car } from "../../domain/carPart/car";
import { carMap } from "../../mappers";
import { ICarRepo } from "../carRepo";

export class CarRepo implements ICarRepo {
  private collection = "cars";
  private mongoDb = MONGO_DB;

  async getById(id: string): Promise<Car> {
    const raw = await this.mongoDb.findOne({ _id: id }, this.collection);

    return carMap.toDomain(raw);
  }
}
