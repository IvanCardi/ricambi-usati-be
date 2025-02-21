import { Error } from "../../../../shared";

export class InvalidCompanyVat extends Error<"InvalidCompanyVat"> {
  constructor() {
    super("InvalidCompanyVat");
  }
}
