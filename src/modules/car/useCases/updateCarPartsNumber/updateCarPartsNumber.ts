import { UseCase } from "../../../../shared";
import { ICarRepo } from "../../repos/carRepo";
import { CarNotFound } from "../_errors/carNotFound";

export type UpdateCarPartsNumberInput = {
  carId: string;
  partsCreated: number;
  partsDeleted: number;
};

export class UpdateCarPartsNumber
  implements UseCase<UpdateCarPartsNumberInput, void>
{
  constructor(private carRepo: ICarRepo) {}

  async execute(input: UpdateCarPartsNumberInput): Promise<void> {
    const car = await this.carRepo.getById(input.carId);

    if (!car) {
      throw new CarNotFound();
    }

    car.updateTotalParts(input.partsCreated, input.partsDeleted);

    await this.carRepo.save(car);
  }
}
