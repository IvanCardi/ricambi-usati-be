import { UseCase } from "../../../../shared";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type DeleteCarPartInput = {
  id: string;
};

export class DeleteCarPart implements UseCase<DeleteCarPartInput, void> {
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute(input: DeleteCarPartInput): Promise<void> {
    const car = await this.carPartRepo.getById(input.id);

    if (!car) {
      throw new CarPartNotFound();
    }

    if (car.status === "available") {
      await this.carPartRepo.delete(input.id);
    }
  }
}
