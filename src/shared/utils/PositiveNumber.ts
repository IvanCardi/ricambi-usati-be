export class PositiveNumber extends Number {
  constructor(km: number) {
    super(km);

    if (km < 0) {
      throw new Error("number must be 0 or positive");
    }
  }
}
