import { Car } from "../domain/car/car";

export interface ICarRepo {
  save(car: Car): Promise<void>;
  existsWithPlate(plate: string): Promise<boolean>;
}
