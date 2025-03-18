import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { ICarPartRepo } from "../../repos/carPartRepo";

export type GetCarPartsInput = {
  carId?: string;
};

export class GetCarParts implements UseCase<GetCarPartsInput, CarPart[]> {
  constructor(private carPartRepo: ICarPartRepo) {}
  async execute({ carId }: GetCarPartsInput): Promise<CarPart[]> {
    const carParts = carId
      ? await this.carPartRepo.getByCar(carId)
      : await this.carPartRepo.getAll();

    return carParts;
  }
}
