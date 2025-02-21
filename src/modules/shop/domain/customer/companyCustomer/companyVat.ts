import { NonEmptyString } from "../../../../../shared";
import { InvalidCompanyVat } from "../../_errors/invalidCompanyVat";

export class CompanyVat extends NonEmptyString<"CompanyVat"> {
  constructor(value: string) {
    super(value);

    if (value.length !== 11) {
      throw new InvalidCompanyVat();
    }
  }
}
