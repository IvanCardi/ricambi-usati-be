import { NonEmptyString } from "../../../../../shared";
import { InvalidFiscalCode } from "../../_errors/invalidFiscalCode";

export class TaxCode extends NonEmptyString<"TaxCode"> {
  private static REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;

  constructor(code: string) {
    super(code, "TaxCode");

    if (!TaxCode.REGEX.test(code)) {
      throw new InvalidFiscalCode();
    }
  }
}
