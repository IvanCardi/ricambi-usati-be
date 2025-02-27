import { Mapper } from "../../../shared";
import { CarPart } from "../domain/carPart/carPart";

export class CarPartMap extends Mapper<CarPart> {
  toPersistance(carPart: CarPart) {
    return {
      _id: carPart.id,
      numbers: carPart.numbers.map((n) => n.toString()),
      photos: carPart.photos,
      carId: carPart.car.carId,
      category: carPart.category.toPath(),
      description: carPart.description.toString(),
      warranty: carPart.warranty.valueOf(),
      price: carPart.price.valueOf(),
      status: carPart.status,
      compatibleCars: carPart.compatibleCars,
      lastUpdated: carPart.lastUpdated?.toISOString(),
    };
  }

  toDomain(object: ReturnType<typeof this.toPersistance>): CarPart {
    throw new Error("Method not implemented.");
  }

  toDTO(object: CarPart): object {
    throw new Error("Method not implemented.");
  }
}
