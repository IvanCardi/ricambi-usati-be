import { Car } from "../domain/carPart/car";

export function createCar(): Car {
  return new Car({
    brand: "brand",
    carId: "car_id",
    model: "model",
    setup: "setup",
    year: 2005,
  });
}
