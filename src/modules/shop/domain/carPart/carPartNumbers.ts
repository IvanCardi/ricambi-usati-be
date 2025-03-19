import { EmptyCarPartNumbers } from "../_errors/emptyCarPartNumbers";
import { CarPartNumber } from "./carPartNumber";

export class CarPartNumbers extends Array<CarPartNumber> {
  static from(numbers: string[]): CarPartNumbers {
    if (numbers.length === 0) {
      throw new EmptyCarPartNumbers();
    }

    return new CarPartNumbers(...numbers.map((n) => new CarPartNumber(n)));
  }
}
