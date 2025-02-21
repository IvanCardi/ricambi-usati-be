import { InvalidCompanySdi } from "../../_errors/invalidCompanySdi";
import { CompanySdi } from "./companySdi";

describe("Company Sdi Tests", () => {
  test("Should throw error if company sdi is longer than 7 chars", () => {
    expect(() => new CompanySdi("12345678")).toThrow(InvalidCompanySdi);
  });

  test("Should throw error if company sdi is shorter than 7 chars", () => {
    expect(() => new CompanySdi("123456")).toThrow(InvalidCompanySdi);
  });
});
