import { Car } from "../domain/car/car";

export interface ICarRepo {
  getById(id: string): Promise<Car>;
  save(car: Car): Promise<void>;
  getAll(): Promise<Car[]>;
  existsWithPlate(plate: string): Promise<boolean>;
}
