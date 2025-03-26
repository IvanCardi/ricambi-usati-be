import { CarPart } from "../domain/carPart/carPart";

export interface ICarPartRepo {
  getFilteredAndOrderedAndPaginated(
    filter: { [field: string]: string },
    order: "price_asc" | "price_desc" | undefined,
    page: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }>;
  getById(id: string): Promise<CarPart | undefined>;
  getByIds(products: string[]): Promise<CarPart[]>;
  getAll(): Promise<CarPart[]>;
  getByCar(id: string): Promise<CarPart[]>;
  save(carPart: CarPart): Promise<void>;
  saveAll(carParts: CarPart[]): Promise<void>;
  delete(id: string): Promise<void>;
}
