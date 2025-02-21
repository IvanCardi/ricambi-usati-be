export class NonEmptyString<T> extends String {
  private _type: T | undefined;

  public constructor(value: string, type: T) {
    super(value);

    if (value === null || value === undefined || value === "") {
      throw new Error(`${type} value is empty string`);
    }

    this._type = type;
  }

  get type() {
    return this._type;
  }
}
