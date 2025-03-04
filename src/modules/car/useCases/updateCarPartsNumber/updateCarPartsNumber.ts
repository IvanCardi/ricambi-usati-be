import { UseCase } from "../../../../shared";
import { ICarRepo } from "../../repos/carRepo";

export type UpdateCarPartsNumberInput = {
  carId: string;
  partsCreated: number;
};

export class UpdateCarPartsNumber
  implements UseCase<UpdateCarPartsNumberInput, void>
{
  constructor(private carRepo: ICarRepo) {}

  async execute(input: UpdateCarPartsNumberInput): Promise<void> {
    const car = await this.carRepo.getById(input.carId);

    car.addTotalParts(input.partsCreated);

    await this.carRepo.save(car);
  }
}
