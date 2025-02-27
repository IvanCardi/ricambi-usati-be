export class PositiveNumber<T> extends Number {
  private _type: T | undefined;
  constructor(num: number, type: T) {
    super(num);

    if (num < 0) {
      throw new Error(`Negative${type}`);
    }

    this._type = type;
  }
}
