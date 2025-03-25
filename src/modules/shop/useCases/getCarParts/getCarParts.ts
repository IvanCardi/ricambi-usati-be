import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CarPartQueryModel } from "../../domain/queryModels/carPartQueryModel";
import { ICarPartRepo } from "../../repos/carPartRepo";

export type GetCarPartsInput = {
  userId?: string;
  carId?: string;
};

export class GetCarParts
  implements UseCase<GetCarPartsInput, CarPartQueryModel[]>
{
  constructor(private carPartRepo: ICarPartRepo) {}
  async execute({
    carId,
    userId,
  }: GetCarPartsInput): Promise<CarPartQueryModel[]> {
    const carParts = carId
      ? await this.carPartRepo.getByCar(carId)
      : await this.carPartRepo.getAll();

    return carParts.map((cp) => ({
      id: cp.id,
      name: cp.name,
      price: cp.price,
      imageUrl: cp.photos.length > 0 ? cp.photos[0] : undefined,
    }));
  }
}
