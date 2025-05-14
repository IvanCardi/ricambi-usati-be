import { UseCase } from "../../../../shared";
import { GetSoldProducts } from "../../domain/services/getSoldProducts";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type CheckCarPartsAvailabilityInput = {
  products: string[];
};

export class CheckCarPartsAvailability
  implements UseCase<CheckCarPartsAvailabilityInput, string[]>
{
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute(input: CheckCarPartsAvailabilityInput): Promise<string[]> {
    const parts = await this.carPartRepo.getByIds(input.products);

    if (parts.length !== input.products.length) {
      throw new CarPartNotFound();
    }

    const soldProducts = new GetSoldProducts(parts).execute();

    return soldProducts.map((p) => p.id);
  }
}
