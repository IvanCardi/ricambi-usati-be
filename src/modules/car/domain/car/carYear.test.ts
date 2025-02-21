import { InvalidCarYear } from "../_errors/invalidCarYear";
import { CarYear } from "./carYear";

describe("Car Year Tests", () => {
  test("Should throw error if it is greater than the current year", () => {
    expect(() => new CarYear(2026)).toThrow(InvalidCarYear);
  });
  test("Should throw error if it is before 2000", () => {
    expect(() => new CarYear(1999)).toThrow(InvalidCarYear);
  });
});
