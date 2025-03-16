import { CarPart } from "../domain/carPart/carPart";

export interface ICarPartRepo {
  getAll(): Promise<CarPart[]>;
  saveAll(carParts: CarPart[]): Promise<void>;
  getByIds(products: string[]): Promise<CarPart[]>;
}
