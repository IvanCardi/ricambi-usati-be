import { Car } from "../domain/carPart/car";
import { CarPart } from "../domain/carPart/carPart";
import { CarPartCategory } from "../domain/carPart/carPartCategory";
import { CarPartDescription } from "../domain/carPart/carPartDescription";
import { CarPartName } from "../domain/carPart/carPartName";
import { CarPartNumber } from "../domain/carPart/carPartNumber";
import { CarPartNumbers } from "../domain/carPart/carPartNumbers";
import { CarPartPrice } from "../domain/carPart/carPartPrice";
import { CarPartWarranty } from "../domain/carPart/carPartWarranty";
import { ShippingCosts } from "../domain/carPart/shippingCosts";

export class CarPartMap {
  toPersistance(carPart: CarPart) {
    return {
      _id: carPart.id,
      name: carPart.name,
      numbers: carPart.numbers.map((n) => n.toString()),
      photos: carPart.photos,
      carId: carPart.car.carId,
      carBrand: carPart.car.brand,
      carModel: carPart.car.model,
      carSetup: carPart.car.setup,
      carYear: carPart.car.year,
      category: carPart.category.toPath(),
      description: carPart.description,
      warranty: carPart.warranty,
      price: carPart.price,
      status: carPart.status,
      compatibleCars: carPart.compatibleCars,
      lastUpdated: carPart.lastUpdated?.toISOString()!,
      adHocShippingCosts: carPart.adHocShippingCosts,
    };
  }

  toDomain(carPart: ReturnType<typeof this.toPersistance>): CarPart {
    return new CarPart(
      {
        car: new Car({
          carId: carPart.carId,
          brand: carPart.carBrand,
          model: carPart.carModel,
          setup: carPart.carSetup,
          year: carPart.carYear,
        }),
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
        adHocShippingCosts: carPart.adHocShippingCosts
          ? new ShippingCosts(carPart.adHocShippingCosts)
          : undefined,
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
      carYear: carPart.car.year,
      category: carPart.category.toPath(),
      description: carPart.description,
      warranty: carPart.warranty,
      price: carPart.price,
      status: carPart.status,
      compatibleCars: carPart.compatibleCars,
      lastUpdated: carPart.lastUpdated?.toISOString(),
      adHocShippingCosts: carPart.adHocShippingCosts,
    };
  }
}
