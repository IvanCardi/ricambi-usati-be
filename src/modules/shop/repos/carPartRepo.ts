import { CarPart } from "../domain/carPart/carPart";

export interface ICarPartRepo {
  saveAll(carParts: CarPart[]): Promise<void>;
}
