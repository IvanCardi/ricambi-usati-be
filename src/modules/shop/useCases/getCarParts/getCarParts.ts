import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { Customer } from "../../domain/customer/customer";
import { CarPartQueryModel } from "../../domain/queryModels/carPartQueryModel";
import { DiscountedPriceCalculator } from "../../domain/services/discountedPriceCalculator";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";

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
  constructor(
    private carPartRepo: ICarPartRepo,
    private customerRepo: ICustomerRepo
  ) {}

  async execute(
    input: GetCarPartsInput
  ): Promise<{ carParts: CarPartQueryModel[]; totalPages: number }> {
    const { totalPages, carParts } = await this.getFromDb(input);

    let customer: Customer | undefined = undefined;
    let discountedPriceCalculator: DiscountedPriceCalculator | undefined =
      undefined;

    if (input.userId) {
      customer = await this.customerRepo.getByUserId(input.userId);

      if (!customer) {
        // TODO: What does it mean?
      }

      if (customer instanceof CompanyCustomer) {
        discountedPriceCalculator = new DiscountedPriceCalculator(
          customer.discount
        );
      }
    }

    return {
      carParts: carParts.map((cp) => ({
        id: cp.id,
        name: cp.name,
        price: discountedPriceCalculator
          ? discountedPriceCalculator.calculate(cp.price)
          : cp.price,
        imageUrl: cp.photos.length > 0 ? cp.photos[0] : undefined,
        carBrand: cp.car.brand,
        carId: cp.car.carId ?? "",
        carModel: cp.car.model,
        carSetup: cp.car.setup,
        category: cp.category.toPath(),
        compatibleCars: cp.compatibleCars,
        description: cp.description,
        lastUpdated: cp.lastUpdated.toISOString(),
        numbers: cp.numbers.map((n) => n.toString()),
        status: cp.status,
        warranty: cp.warranty,
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
