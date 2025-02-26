import { EmptyCarPartNumbers } from "../_errors/emptyCarPartNumbers";

export class CarPartNumbers extends Array<string> {
  constructor(...numbers: string[]) {
    super(...numbers);

    if (numbers.length === 0) {
      throw new EmptyCarPartNumbers();
    }
  }
}
