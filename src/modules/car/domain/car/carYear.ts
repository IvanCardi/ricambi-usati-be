import moment from "moment";
import { InvalidCarYear } from "../_errors/invalidCarYear";

export class CarYear extends Number {
  constructor(year: number) {
    super(year);

    if (year > moment().year()) {
      throw new InvalidCarYear();
    }

    if (year < 2000) {
      throw new InvalidCarYear();
    }
  }
}
