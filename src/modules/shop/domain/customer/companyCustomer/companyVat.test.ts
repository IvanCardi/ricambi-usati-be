import { InvalidCompanyVat } from "../../_errors/invalidCompanyVat";
import { CompanyVat } from "./companyVat";

describe("Company Vat Tests", () => {
  test("Should throw error if company vat is longer than 11 chars", () => {
    expect(() => new CompanyVat("111111111111")).toThrow(InvalidCompanyVat);
  });

  test("Should throw error if company vat is shorter than 11 chars", () => {
    expect(() => new CompanyVat("1111111111")).toThrow(InvalidCompanyVat);
  });
});
