import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";
import { SoldPartsMoreThanTotalParts } from "../_errors/soldPartsMoreThanTotalParts";
import { Car } from "./car";
import { CarBrand } from "./carBrand";
import { CarDescription } from "./carDescription";
import { CarKilometers } from "./carKilometers";
import { CarModel } from "./carModel";
import { CarPlate } from "./carPlate";
import { CarSetup } from "./carSetup";
import { CarSoldParts } from "./carSoldParts";
import { CarTotalParts } from "./carTotalParts";
import { CarYear } from "./carYear";

describe("Car Tests", () => {
  test("Should throw error when parts sold are more than total parts", () => {
    expect(
      () =>
        new Car({
          brand: new CarBrand("Citroen"),
          model: new CarModel("C3"),
          setup: new CarSetup("1.5 100 CV Diesel"),
          description: new CarDescription("Come nuova"),
          plate: new CarPlate("AA123AA"),
          year: new CarYear(2021),
          kilometers: new CarKilometers(1000),
          soldParts: new CarSoldParts(10),
          totalParts: new CarTotalParts(9),
        })
    ).toThrow(SoldPartsMoreThanTotalParts);
  });
});
