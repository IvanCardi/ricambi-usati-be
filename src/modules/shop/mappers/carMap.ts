import { Car } from "../domain/carPart/car";

export class CarMap {
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
}
