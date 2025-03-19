import { Car } from "../domain/carPart/car";
import { CarPart } from "../domain/carPart/carPart";
import { CarPartCategory } from "../domain/carPart/carPartCategory";
import { CarPartDescription } from "../domain/carPart/carPartDescription";
import { CarPartName } from "../domain/carPart/carPartName";
import { CarPartNumber } from "../domain/carPart/carPartNumber";
import { CarPartNumbers } from "../domain/carPart/carPartNumbers";
import { CarPartPrice } from "../domain/carPart/carPartPrice";
import { CarPartWarranty } from "../domain/carPart/carPartWarranty";

export class CarPartMap {
  toPersistance(carPart: CarPart) {
    return {
      _id: carPart.id,
      name: carPart.name,
      numbers: carPart.numbers.map((n) => n.toString()),
      photos: carPart.photos,
      carId: carPart.car.carId,
      category: carPart.category.toPath(),
      description: carPart.description,
      warranty: carPart.warranty,
      price: carPart.price,
      status: carPart.status,
      compatibleCars: carPart.compatibleCars,
      lastUpdated: carPart.lastUpdated?.toISOString()!,
    };
  }

  toDomain(carPart: ReturnType<typeof this.toPersistance>, car: Car): CarPart {
    return new CarPart(
      {
        car,
        category: CarPartCategory.from(carPart.category),
        compatibleCars: carPart.compatibleCars,
        description: new CarPartDescription(carPart.description),
        name: new CarPartName(carPart.name),
        numbers: new CarPartNumbers(
          ...carPart.numbers.map((n) => new CarPartNumber(n))
        ),
        photos: carPart.photos,
        price: new CarPartPrice(carPart.price),
        status: carPart.status,
        warranty: new CarPartWarranty(carPart.warranty),
        lastUpdated: new Date(carPart.lastUpdated),
      },
      carPart._id
    );
  }

  toDTO(carPart: CarPart): object {
    return {
      id: carPart.id,
      name: carPart.name,
      numbers: carPart.numbers.map((n) => n.toString()),
      photos: carPart.photos,
      carId: carPart.car.carId,
      carBrand: carPart.car.brand,
      carModel: carPart.car.model,
      carSetup: carPart.car.setup,
      category: carPart.category.toPath(),
      description: carPart.description,
      warranty: carPart.warranty,
      price: carPart.price,
      status: carPart.status,
      compatibleCars: carPart.compatibleCars,
      lastUpdated: carPart.lastUpdated?.toISOString(),
    };
  }
}
