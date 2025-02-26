import { EmptyCarPartNumbers } from "../_errors/emptyCarPartNumbers";
import { CarPartNumbers } from "./carPartNumbers";

describe("Car Part Numbers Tests", () => {
  test("Should throw error when the array is empty", () => {
    expect(() => new CarPartNumbers()).toThrow(EmptyCarPartNumbers);
    expect(() => new CarPartNumbers(...[])).toThrow(EmptyCarPartNumbers);
  });
});
