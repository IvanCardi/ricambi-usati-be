import { NonEmptyString } from "../../../../../shared";
import { InvalidCompanySdi } from "../../_errors/invalidCompanySdi";

export class CompanySdi extends NonEmptyString<"CompanySdi"> {
  constructor(sdi: string) {
    super(sdi, "CompanySdi");

    if (sdi.length !== 7) {
      throw new InvalidCompanySdi();
    }
  }
}
