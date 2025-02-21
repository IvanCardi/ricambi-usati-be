export class NonEmptyString<T> {
  private type: T | undefined;
  private _value: string;

  public constructor(value: string) {
    if (value === null || value === undefined || value === "") {
      throw new Error("value is empty string");
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}
