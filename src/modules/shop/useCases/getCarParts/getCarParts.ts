import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { ICarPartRepo } from "../../repos/carPartRepo";

export class GetCarParts implements UseCase<void, CarPart[]> {
  constructor(private carPartRepo: ICarPartRepo) {}
  async execute(): Promise<CarPart[]> {
    const carParts = await this.carPartRepo.getAll();

    return carParts;
  }
}
