import { CarBrand } from "../domain/car/carBrand";
import { CarModel } from "../domain/car/carModel";
import { CarSetup } from "../domain/car/carSetup";

export interface IBrandModelSetupRepo {
  getBrand(brand: string): Promise<CarBrand | undefined>;
  getModelForBrand(model: string, brand: string): Promise<CarModel | undefined>;
  getSetupForModel(
    setup: string,
    model: string,
    brand: string
  ): Promise<CarSetup | undefined>;
}
