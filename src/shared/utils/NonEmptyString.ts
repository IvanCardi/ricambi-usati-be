export class NonEmptyString<T> extends String {
  private type: T | undefined;

  public constructor(value: string) {
    super(value);

    if (value === null || value === undefined || value === "") {
      throw new Error("value is empty string");
    }
  }
}
