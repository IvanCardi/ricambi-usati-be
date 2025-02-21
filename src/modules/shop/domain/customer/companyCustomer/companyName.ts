import { NonEmptyString } from "../../../../../shared";

export class CompanyName extends NonEmptyString<"CompanyName"> {
  public constructor(name: string) {
    super(name, "CompanyName");
  }
}
