import { InvalidPassword } from "./_errors/invalidPassword";
import { Password } from "./password";

describe("Password tests", () => {
  test("Should create a password hashed correctly", async () => {
    const plainTextPassword = "Test1234!";
    const password = await Password.create(plainTextPassword);

    expect(password).not.toEqual(plainTextPassword);
  });
  test("Should throw error if password is shorter than 8 chars", async () => {
    try {
      await Password.create("!aA1");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPassword);
    }
  });
  test("Should throw error if password misses an uppercase letter", async () => {
    try {
      await Password.create("!aaaaaa1");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPassword);
    }
  });
  test("Should throw error if password misses a lowercase letter", async () => {
    try {
      await Password.create("!AAAAAA1");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPassword);
    }
  });
  test("Should throw error if password misses a number", async () => {
    try {
      await Password.create("!AAAAAAa");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPassword);
    }
  });
  test("Should throw error if password misses a special char", async () => {
    try {
      await Password.create("2AAAAAAa");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPassword);
    }
  });
});
