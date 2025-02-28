import { UseCase } from "../../../../shared";
import { Car } from "../../domain/car/car";
import { ICarRepo } from "../../repos/carRepo";

export class GetCars implements UseCase<void, any> {
  constructor(private carRepo: ICarRepo) {}

  async execute(): Promise<Car[]> {
    const cars = this.carRepo.getAll();

    return cars;
  }
}
