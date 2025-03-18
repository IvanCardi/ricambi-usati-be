import { CarPart } from "../domain/carPart/carPart";

export interface ICarPartRepo {
  getAll(): Promise<CarPart[]>;
  getByCar(id: string): Promise<CarPart[]>;
  saveAll(carParts: CarPart[]): Promise<void>;
  getByIds(products: string[]): Promise<CarPart[]>;
}
