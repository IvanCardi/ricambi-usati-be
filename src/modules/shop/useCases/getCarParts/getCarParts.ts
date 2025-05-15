import { UseCase } from "../../../../shared";
import { CarPartQueryModel } from "../../domain/queryModels/carPartQueryModel";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";

export type OrderBy = "price_asc" | "price_desc";

export type GetCarPartsInput = {
  carId?: string;
};

export class GetCarParts
  implements UseCase<GetCarPartsInput, CarPartQueryModel[]>
{
  constructor(
    private carPartRepo: ICarPartRepo,
    private customerRepo: ICustomerRepo
  ) {}

  async execute(input: GetCarPartsInput): Promise<CarPartQueryModel[]> {
    const carParts = await this.carPartRepo.getAll();

    const filteredCarParts = input.carId
      ? carParts.filter((cp) => cp.car.carId === input.carId)
      : carParts;

    return filteredCarParts.map((cp) => ({
      id: cp.id,
      carBrand: cp.car.brand,
      carId: cp.car.carId,
      carModel: cp.car.model,
      carSetup: cp.car.setup,
      carYear: cp.car.year.toString(),
      category: cp.category.toPath(),
      compatibleCars: cp.compatibleCars,
      description: cp.description,
      lastUpdated: cp.lastUpdated.toISOString(),
      name: cp.name,
      numbers: cp.numbers.map((n) => n.toString()),
      photos: cp.photos,
      price: cp.price,
      status: cp.status,
      warranty: cp.warranty,
      adHocShippingCosts: cp.adHocShippingCosts,
      technicalDetails: [],
    }));
  }
}
