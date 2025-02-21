import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Car } from "../../domain/car/car";
import { carMap } from "../../mappers";
import { ICarRepo } from "../carRepo";

export class CarRepo implements ICarRepo {
  private collection = "cars";
  private mongoDb = MONGO_DB;

  async save(car: Car): Promise<void> {
    const raw = carMap.toPersistance(car);

    await this.mongoDb.save(raw, this.collection);
  }

  async existsWithPlate(plate: string): Promise<boolean> {
    const raw = await this.mongoDb.findOne({ plate }, this.collection);

    return !!raw;
  }
}
