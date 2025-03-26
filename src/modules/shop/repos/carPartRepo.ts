import { CarPart } from "../domain/carPart/carPart";
import { OrderBy } from "../useCases/getCarParts/getCarParts";

export interface ICarPartRepo {
  getFilteredAndOrderedAndPaginated(
    filter: {
      brand?: string;
      model?: string;
      setup?: string;
      startYear?: number;
      endYear?: number;
    },
    order: OrderBy | undefined,
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
