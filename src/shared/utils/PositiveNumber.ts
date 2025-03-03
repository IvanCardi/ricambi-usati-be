import { Error } from "../core/Error";

class NegativeNumberError extends Error<"NegativeNumberError"> {
  constructor(message: string) {
    super("NegativeNumberError", message);
  }
}
export class PositiveNumber<T> extends Number {
  private _type: T | undefined;
  constructor(num: number, type: T) {
    super(num);

    if (num < 0) {
      throw new NegativeNumberError(`Negative${type}`);
    }

    this._type = type;
  }
}
