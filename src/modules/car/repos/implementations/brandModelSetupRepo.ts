import { CarBrand } from "../../domain/car/carBrand";
import { CarModel } from "../../domain/car/carModel";
import { CarSetup } from "../../domain/car/carSetup";
import { IBrandModelSetupRepo } from "../brandModelSetupRepo";

export class BrandModelSetupRepo implements IBrandModelSetupRepo {
  async getBrand(brand: string): Promise<CarBrand | undefined> {
    return new CarBrand(brand); // TODO: connect to API
  }

  async getModelForBrand(
    model: string,
    brand: string
  ): Promise<CarModel | undefined> {
    return new CarModel(model); // TODO: connect to API
  }

  async getSetupForModel(
    setup: string,
    model: string,
    brand: string
  ): Promise<CarSetup | undefined> {
    return new CarSetup(setup); // TODO: connect to API
  }
}
