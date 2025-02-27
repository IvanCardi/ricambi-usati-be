import { Mapper } from "../../../shared";
import { PositiveNumber } from "../../../shared/utils/PositiveNumber";
import { Car } from "../domain/car/car";
import { CarBrand } from "../domain/car/carBrand";
import { CarDescription } from "../domain/car/carDescription";
import { CarKilometers } from "../domain/car/carKilometers";
import { CarModel } from "../domain/car/carModel";
import { CarPlate } from "../domain/car/carPlate";
import { CarSetup } from "../domain/car/carSetup";
import { CarSoldParts } from "../domain/car/carSoldParts";
import { CarTotalParts } from "../domain/car/carTotalParts";
import { CarYear } from "../domain/car/carYear";

export class CarMap extends Mapper<Car> {
  toPersistance(car: Car) {
    return {
      _id: car.id,
      brand: car.brand.toString(),
      model: car.model.toString(),
      setup: car.setup.toString(),
      plate: car.plate.toString(),
      description: car.description.toString(),
      kilometers: car.kilometers.valueOf(),
      year: car.year.valueOf(),
      totalParts: car.totalParts.valueOf(),
      soldParts: car.soldParts.valueOf(),
    };
  }

  toDomain(car: ReturnType<typeof this.toPersistance>): Car {
    return new Car(
      {
        brand: new CarBrand(car.brand),
        description: new CarDescription(car.description),
        kilometers: new CarKilometers(car.kilometers),
        model: new CarModel(car.model),
        plate: new CarPlate(car.plate),
        setup: new CarSetup(car.setup),
        soldParts: new CarSoldParts(car.soldParts),
        totalParts: new CarTotalParts(car.totalParts),
        year: new CarYear(car.year),
      },
      car._id
    );
  }

  toDTO(car: Car) {
    return {
      id: car.id,
      brand: car.brand.toString(),
      model: car.model.toString(),
      setup: car.setup.toString(),
      plate: car.plate.toString(),
      description: car.description.toString(),
      kilometers: car.kilometers.valueOf(),
      year: car.year.valueOf(),
      totalParts: car.totalParts.valueOf(),
      soldParts: car.soldParts.valueOf(),
    };
  }
}
