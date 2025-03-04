import { Car } from "../domain/carPart/car";

export interface ICarRepo {
  getAll(): Promise<Car[]>;
  getById(id: string): Promise<Car | undefined>;
}
