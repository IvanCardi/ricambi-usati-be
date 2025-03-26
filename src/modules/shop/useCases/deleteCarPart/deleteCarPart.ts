import { UseCase } from "../../../../shared";
import CarPartsDeletedEmitter from "../../events/carPartsDeleted";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type DeleteCarPartInput = {
  id: string;
};

export class DeleteCarPart implements UseCase<DeleteCarPartInput, void> {
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute(input: DeleteCarPartInput): Promise<void> {
    const carPart = await this.carPartRepo.getById(input.id);

    if (!carPart) {
      throw new CarPartNotFound();
    }

    if (carPart.status === "available") {
      await this.carPartRepo.delete(input.id);

      if (carPart.car.carId) {
        CarPartsDeletedEmitter.emit({
          carId: carPart.car.carId,
          partsDeleted: 1,
        });
      }
    }
  }
}
