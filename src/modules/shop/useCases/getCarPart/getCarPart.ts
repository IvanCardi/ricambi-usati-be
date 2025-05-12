import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
import { CompanyCustomer } from "../../domain/customer/companyCustomer/companyCustomer";
import { Customer } from "../../domain/customer/customer";
import { CarPartQueryModel } from "../../domain/queryModels/carPartQueryModel";
import { DiscountedPriceCalculator } from "../../domain/services/discountedPriceCalculator";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { CarPartNotFound } from "../_errors/carPartNotFound";

export type GetCarPartInput = {
  id: string;
  userId: string;
};

export class GetCarPart implements UseCase<GetCarPartInput, CarPartQueryModel> {
  constructor(
    private carPartRepo: ICarPartRepo,
    private customerRepo: ICustomerRepo
  ) {}

  async execute({ id, userId }: GetCarPartInput): Promise<CarPartQueryModel> {
    const carPart = await this.carPartRepo.getById(id);

    if (!carPart) {
      throw new CarPartNotFound();
    }

    let customer: Customer | undefined = undefined;
    let discountedPriceCalculator: DiscountedPriceCalculator | undefined =
      undefined;

    if (userId) {
      customer = await this.customerRepo.getByUserId(userId);

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
      id: carPart.id,
      name: carPart.name,
      price: discountedPriceCalculator
        ? discountedPriceCalculator.calculate(carPart.price)
        : carPart.price,
      imageUrl: carPart.photos.length > 0 ? carPart.photos[0] : undefined,
      carBrand: carPart.car.brand,
      carId: carPart.car.carId ?? "",
      carModel: carPart.car.model,
      carSetup: carPart.car.setup,
      carYear: carPart.car.year.toString(),
      category: carPart.category.toPath(),
      compatibleCars: carPart.compatibleCars,
      description: carPart.description,
      lastUpdated: carPart.lastUpdated.toISOString(),
      numbers: carPart.numbers.map((n) => n.toString()),
      status: carPart.status,
      warranty: carPart.warranty,
      photos: carPart.photos,
      adHocShippingCosts: carPart.adHocShippingCosts,
    };
  }
}
