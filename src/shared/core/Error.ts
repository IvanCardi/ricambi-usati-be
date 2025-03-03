export abstract class Error<T extends string> {
  public code: T;
  public readonly message: string;

  constructor(code: T, message?: string) {
    this.code = code;
    this.message = message || `${code}`;
  }
}
