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

export class CarMap {
  toPersistance(car: Car) {
    return {
      _id: car.id,
      brand: car.brand,
      model: car.model,
      setup: car.setup,
      plate: car.plate,
      description: car.description,
      kilometers: car.kilometers,
      year: car.year,
      totalParts: car.totalParts,
      soldParts: car.soldParts,
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
      brand: car.brand,
      model: car.model,
      setup: car.setup,
      plate: car.plate,
      description: car.description,
      kilometers: car.kilometers,
      year: car.year,
      totalParts: car.totalParts,
      soldParts: car.soldParts,
    };
  }
}
