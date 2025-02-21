import { NonEmptyString } from "../../../../../shared";

export class FirstName extends NonEmptyString<"FirstName"> {
  constructor(firstName: string) {
    super(firstName, "FirstName");
  }
}
