import { NonEmptyString } from "../../../../../shared";
import { InvalidCompanyVat } from "../../_errors/invalidCompanyVat";

export class CompanyVat extends NonEmptyString<"CompanyVat"> {
  constructor(vat: string) {
    super(vat, "CompanyVat");

    if (vat.length !== 11) {
      throw new InvalidCompanyVat();
    }
  }
}
