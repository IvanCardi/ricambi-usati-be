import { Error } from "../core/Error";

class EmptyStringError extends Error<"EmptyStringError"> {
  constructor(message: string) {
    super("EmptyStringError", message);
  }
}

export class NonEmptyString<T> extends String {
  private _type: T | undefined;

  public constructor(value: string, type: T) {
    super(value);

    if (value === null || value === undefined || value === "") {
      throw new EmptyStringError(`Empty${type}`);
    }

    this._type = type;
  }

  get type() {
    return this._type;
  }
}
