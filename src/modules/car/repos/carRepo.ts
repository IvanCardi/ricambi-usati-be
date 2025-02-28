import { Car } from "../domain/car/car";

export interface ICarRepo {
  save(car: Car): Promise<void>;
  getAll(): Promise<Car[]>;
  existsWithPlate(plate: string): Promise<boolean>;
}
