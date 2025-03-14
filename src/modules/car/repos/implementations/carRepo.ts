import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { Car } from "../../domain/car/car";
import { carMap } from "../../mappers";
import { ICarRepo } from "../carRepo";

export class CarRepo implements ICarRepo {
  private collection = "cars";
  private mongoDb = MONGO_DB;

  async getById(id: string): Promise<Car | undefined> {
    const raw = (await this.mongoDb.findOne(
      { _id: id },
      this.collection
    )) as ReturnType<typeof carMap.toPersistance>;

    if (!raw) {
      return undefined;
    }

    return carMap.toDomain(raw);
  }

  async save(car: Car): Promise<void> {
    const raw = carMap.toPersistance(car);

    if (!!(await this.getById(car.id))) {
      await this.mongoDb.replace({ _id: car.id }, raw, this.collection);
    } else {
      await this.mongoDb.save(raw, this.collection);
    }
  }

  async getAll(): Promise<Car[]> {
    const raws = (await this.mongoDb.find({}, this.collection)) as ReturnType<
      typeof carMap.toPersistance
    >[];

    return raws.map((r) => carMap.toDomain(r));
  }

  async existsWithPlate(plate: string): Promise<boolean> {
    const raw = await this.mongoDb.findOne({ plate }, this.collection);

    return !!raw;
  }
}
