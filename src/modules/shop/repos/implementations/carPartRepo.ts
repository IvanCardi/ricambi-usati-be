import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { CarPart } from "../../domain/carPart/carPart";
import { carPartMap } from "../../mappers";
import { ICarPartRepo } from "../carPartRepo";
import { ICarRepo } from "../carRepo";

export class CarPartRepo implements ICarPartRepo {
  private collection = "car_parts";
  private mongoDb = MONGO_DB;

  constructor(private carRepo: ICarRepo) {}

  async getAll(): Promise<CarPart[]> {
    const cars = await this.carRepo.getAll();

    const rawCarParts = (await this.mongoDb.find(
      {},
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    return rawCarParts.map((cp) =>
      carPartMap.toDomain(cp, cars.find((c) => c.carId === cp.carId)!)
    );
  }

  async getByCar(id: string): Promise<CarPart[]> {
    const car = await this.carRepo.getById(id);

    if (!car) {
      throw new Error("error getting all car parts for a specific car");
    }

    const rawCarParts = (await this.mongoDb.find(
      { carId: id },
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    return rawCarParts.map((cp) => carPartMap.toDomain(cp, car));
  }

  async saveAll(carParts: CarPart[]): Promise<void> {
    const rawParts = carParts.map(carPartMap.toPersistance);

    await this.mongoDb.saveMany(rawParts, this.collection);
  }

  async getByIds(ids: string[]): Promise<CarPart[]> {
    const rawCarParts = (await this.mongoDb.findManyByIds(
      ids,
      this.collection
    )) as ReturnType<typeof carPartMap.toPersistance>[];

    const carIds = [...new Set(rawCarParts.map((p) => p.carId))];

    const cars = await this.carRepo.getByIds(carIds);

    return rawCarParts.map((cp) =>
      carPartMap.toDomain(cp, cars.find((c) => c.carId === cp.carId)!)
    );
  }
}
