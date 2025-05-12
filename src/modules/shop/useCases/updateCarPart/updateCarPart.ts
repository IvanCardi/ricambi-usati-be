import { UseCase } from "../../../../shared";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type UpdateCarPartInput = {
  id: string;
  name: string;
  numbers: string[];
  category: string; // like "cat1/cat2/cat3"
  description: string;
  photos: string[];
  warranty: number; // in month
  price: number; // in €
  compatibleCars: string[];
  adHocShippingCosts?: number
};

export class UpdateCarPart implements UseCase<UpdateCarPartInput, void> {
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute(input: UpdateCarPartInput): Promise<void> {
    const part = await this.carPartRepo.getById(input.id);

    if (!part) {
      throw new CarPartNotFound();
    }

    part.update(input);

    await this.carPartRepo.save(part);
  }
}
