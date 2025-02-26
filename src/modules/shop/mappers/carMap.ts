import { Mapper } from "../../../shared";
import { Car } from "../domain/carPart/car";

export class CarMap extends Mapper<Car> {
  toPersistance(car: Car): object {
    throw new Error("method not implemented");
  }

  toDomain(car: {
    _id: string;
    brand: string;
    model: string;
    setup: string;
    year: number;
  }): Car {
    return new Car({
      carId: car._id,
      brand: car.brand,
      model: car.model,
      setup: car.setup,
      year: car.year,
    });
  }

  toDTO(car: Car): object {
    throw new Error("method not implemented");
  }
}
