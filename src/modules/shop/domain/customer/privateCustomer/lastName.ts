import { NonEmptyString } from "../../../../../shared";

export class LastName extends NonEmptyString<"LastName"> {
  constructor(lastName: string) {
    super(lastName, "LastName");
  }
}
