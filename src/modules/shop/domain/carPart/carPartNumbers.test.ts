import { EmptyCarPartNumbers } from "../_errors/emptyCarPartNumbers";
import { CarPartNumbers } from "./carPartNumbers";

describe("Car Part Numbers Tests", () => {
  test("Should throw error when the array is empty", () => {
    expect(() => CarPartNumbers.from([])).toThrow(EmptyCarPartNumbers);
  });
});
