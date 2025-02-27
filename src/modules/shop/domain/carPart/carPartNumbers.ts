import { EmptyCarPartNumbers } from "../_errors/emptyCarPartNumbers";
import { CarPartNumber } from "./carPartNumber";

export class CarPartNumbers extends Array<CarPartNumber> {
  constructor(...numbers: CarPartNumber[]) {
    super(...numbers);

    if (numbers.length === 0) {
      throw new EmptyCarPartNumbers();
    }
  }
}
