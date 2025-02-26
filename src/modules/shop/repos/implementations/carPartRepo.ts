import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { CarPart } from "../../domain/carPart/carPart";
import { carPartMap } from "../../mappers";
import { ICarPartRepo } from "../carPartRepo";

export class CarPartRepo implements ICarPartRepo {
  private collection = "car_parts";
  private mongoDb = MONGO_DB;

  async saveAll(carParts: CarPart[]): Promise<void> {
    const rawParts = carParts.map(carPartMap.toPersistance);

    await this.mongoDb.saveMany(rawParts, this.collection);
  }
}
