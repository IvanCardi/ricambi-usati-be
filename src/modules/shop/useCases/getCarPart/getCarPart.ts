import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type GetCarPartInput = {
  id: string;
};

export class GetCarPart implements UseCase<GetCarPartInput, CarPart> {
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute({ id }: GetCarPartInput): Promise<CarPart> {
    const carPart = await this.carPartRepo.getById(id);

    if (!carPart) {
      throw new CarPartNotFound();
    }

    return carPart;
  }
}
