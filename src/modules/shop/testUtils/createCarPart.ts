import { Car } from "../domain/carPart/car";
import { CarPart, CarPartProps } from "../domain/carPart/carPart";
import { CarPartCategory } from "../domain/carPart/carPartCategory";
import { CarPartDescription } from "../domain/carPart/carPartDescription";
import { CarPartName } from "../domain/carPart/carPartName";
import { CarPartNumber } from "../domain/carPart/carPartNumber";
import { CarPartNumbers } from "../domain/carPart/carPartNumbers";
import { CarPartPrice } from "../domain/carPart/carPartPrice";
import { CarPartWarranty } from "../domain/carPart/carPartWarranty";

export function createCarPart(props: Partial<CarPartProps>): CarPart {
  return new CarPart({
    car:
      props.car ??
      new Car({
        brand: "brand",
        carId: "car_id",
        model: "model",
        setup: "setup",
        year: 2005,
      }),
    category: props.category ?? CarPartCategory.from("category"),
    compatibleCars: props.compatibleCars ?? [],
    description: props.description ?? new CarPartDescription("desc"),
    name: props.name ?? new CarPartName("name"),
    numbers: props.numbers ?? new CarPartNumbers(new CarPartNumber("1")),
    photos: props.photos ?? [],
    price: props.price ?? new CarPartPrice(10),
    status: props.status ?? "available",
    warranty: props.warranty ?? new CarPartWarranty(0),
    lastUpdated: props.lastUpdated,
  });
}
