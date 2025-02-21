import { NonEmptyString } from "../../../../../shared";
import { InvalidCompanySdi } from "../../_errors/invalidCompanySdi";

export class CompanySdi extends NonEmptyString<"CompanySdi"> {
  constructor(value: string) {
    super(value);

    if (value.length !== 7) {
      throw new InvalidCompanySdi();
    }
  }
}
