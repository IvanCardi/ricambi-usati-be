import { UseCase } from "../../../../shared";
import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";
import { Car } from "../../domain/car/car";
import { CarDescription } from "../../domain/car/carDescription";
import { CarPlate } from "../../domain/car/carPlate";
import { CarYear } from "../../domain/car/carYear";
import { IBrandModelSetupRepo } from "../../repos/brandModelSetupRepo";
import { ICarRepo } from "../../repos/carRepo";
import { BrandNotFound } from "../_errors/brandNotFound";
import { DuplicatedCar } from "../_errors/duplicatedCar";
import { ModelForBrandNotFound } from "../_errors/modelForBrandNotFound";
import { SetupForModelNotFound } from "../_errors/setupForModelNotFound";

export type CreateCarInput = {
  brand: string;
  model: string;
  setup: string;
  plate: string;
  year: number;
  kilometers: number;
  description: string;
};

export class CreateCar implements UseCase<CreateCarInput, Car> {
  constructor(
    private carRepo: ICarRepo,
    private brandModelSetupRepo: IBrandModelSetupRepo
  ) {}

  async execute(input: CreateCarInput): Promise<Car> {
    if (await this.carRepo.existsWithPlate(input.plate)) {
      throw new DuplicatedCar();
    }

    const brand = await this.brandModelSetupRepo.getBrand(input.brand);

    if (!brand) {
      throw new BrandNotFound();
    }

    const model = await this.brandModelSetupRepo.getModelForBrand(
      input.model,
      input.brand
    );

    if (!model) {
      throw new ModelForBrandNotFound();
    }

    const setup = await this.brandModelSetupRepo.getSetupForModel(
      input.setup,
      input.model,
      input.brand
    );

    if (!setup) {
      throw new SetupForModelNotFound();
    }

    const car = new Car({
      brand,
      model,
      setup,
      description: new CarDescription(input.description),
      kilometers: new PositiveNumber(input.kilometers),
      plate: new CarPlate(input.plate),
      year: new CarYear(input.year),
      soldParts: 0,
      totalParts: 0,
    });

    await this.carRepo.save(car);

    return car;
  }
}
