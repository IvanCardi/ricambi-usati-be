import { CarPart } from "../domain/carPart/carPart";

export interface ICarPartRepo {
  getById(id: string): Promise<CarPart | undefined>;
  getByIds(products: string[]): Promise<CarPart[]>;
  getAll(): Promise<CarPart[]>;
  getByCar(id: string): Promise<CarPart[]>;
  save(carPart: CarPart): Promise<void>;
  saveAll(carParts: CarPart[]): Promise<void>;
}
