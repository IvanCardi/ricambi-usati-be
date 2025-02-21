export class PositiveNumber<T> extends Number {
  constructor(num: number) {
    super(num);

    if (num < 0) {
      throw new Error(`number must be 0 or positive`);
    }
  }
}
