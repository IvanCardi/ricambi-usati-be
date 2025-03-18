import { UseCase } from "../../../../shared";
import { Car } from "../../domain/car/car";
import { ICarRepo } from "../../repos/carRepo";
import { CarNotFound } from "../_errors/carNotFound";

export type GetCarInput = {
  id: string;
};

export class GetCar implements UseCase<GetCarInput, Car> {
  constructor(private carRepo: ICarRepo) {}

  async execute(input: GetCarInput): Promise<Car> {
    const car = await this.carRepo.getById(input.id);

    if (!car) {
      throw new CarNotFound();
    }

    return car;
  }
}
