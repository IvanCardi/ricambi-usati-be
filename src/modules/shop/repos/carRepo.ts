import { Car } from "../domain/carPart/car";

export interface ICarRepo {
  getById(id: string): Promise<Car>;
}
