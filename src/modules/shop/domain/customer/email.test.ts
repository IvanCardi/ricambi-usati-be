import { InvalidEmail } from "../_errors/invalidEmail";
import { Email } from "./email";

describe("Email Tests", () => {
  test("Should create a mail when email is valid", () => {
    const email = new Email("1.a.a@a.a.a.a.a.aa");

    expect(email).toBeDefined();
  });
  test("Should throw error when the email is invalid", () => {
    expect(() => new Email("something@other.a")).toThrow(InvalidEmail);
  });
});
