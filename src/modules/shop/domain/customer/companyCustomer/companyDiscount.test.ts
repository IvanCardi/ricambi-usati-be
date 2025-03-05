import { InvalidCompanyDiscount } from "../../_errors/invalidCompanyDiscount";
import { CompanyDiscount } from "./companyDiscount";

describe("Company Discount Tests", () => {
  test("Should throw error when the value is more than 100", () => {
    expect(() => new CompanyDiscount(100.1)).toThrow(InvalidCompanyDiscount);
  });
});
