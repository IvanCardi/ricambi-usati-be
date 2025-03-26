import { CarPart } from "../domain/carPart/carPart";
import { OrderBy } from "../useCases/getCarParts/getCarParts";

export interface ICarPartRepo {
  getByNumberAndPage(
    number: string,
    page: number,
    limit: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }>;
  getFilteredAndOrderedAndPaginated(
    filter: {
      brand?: string;
      model?: string;
      setup?: string;
      startYear?: number;
      endYear?: number;
      category?: string;
    },
    order: OrderBy | undefined,
    page: number,
    limit: number
  ): Promise<{ carParts: CarPart[]; totalPages: number }>;
  getById(id: string): Promise<CarPart | undefined>;
  getByIds(products: string[]): Promise<CarPart[]>;
  getAll(): Promise<CarPart[]>;
  getByCar(id: string): Promise<CarPart[]>;
  save(carPart: CarPart): Promise<void>;
  saveAll(carParts: CarPart[]): Promise<void>;
  delete(id: string): Promise<void>;
}
