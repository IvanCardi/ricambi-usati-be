import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CarPartQueryModel } from "../../domain/queryModels/carPartQueryModel";
import { ICarPartRepo } from "../../repos/carPartRepo";

export type OrderBy = "price_asc" | "price_desc";

export type GetCarPartsInput = {
  userId?: string;
  carId?: string;
  page?: number;
  brand?: string;
  model?: string;
  setup?: string;
  startYear?: number;
  endYear?: number;
  order?: OrderBy;
  number?: string;
};

export class GetCarParts
  implements
    UseCase<
      GetCarPartsInput,
      { carParts: CarPartQueryModel[]; totalPages: number }
    >
{
  constructor(private carPartRepo: ICarPartRepo) {}

  async execute(
    input: GetCarPartsInput
  ): Promise<{ carParts: CarPartQueryModel[]; totalPages: number }> {
    const { totalPages, carParts } = await this.getFromDb(input);

    return {
      carParts: carParts.map((cp) => ({
        id: cp.id,
        name: cp.name,
        price: cp.price,
        imageUrl: cp.photos.length > 0 ? cp.photos[0] : undefined,
      })),
      totalPages,
    };
  }

  private async getFromDb({
    carId,
    page,
    brand,
    endYear,
    model,
    setup,
    startYear,
    order,
    number,
  }: GetCarPartsInput): Promise<{ carParts: CarPart[]; totalPages: number }> {
    if (number) {
      return this.carPartRepo.getByNumberAndPage(number, page ?? 1, 8);
    }

    if (page || brand || endYear || model || setup || startYear || order) {
      return this.carPartRepo.getFilteredAndOrderedAndPaginated(
        { brand, model, setup, startYear, endYear },
        order,
        page || 1,
        8
      );
    }

    if (carId) {
      const carParts = await this.carPartRepo.getByCar(carId);

      return {
        carParts,
        totalPages: Math.ceil(carParts.length / 8),
      };
    }

    const carParts = await this.carPartRepo.getAll();

    return {
      carParts,
      totalPages: Math.ceil(carParts.length / 8),
    };
  }
}
