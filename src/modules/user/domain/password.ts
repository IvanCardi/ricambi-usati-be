import { salt } from "../../../config";
import { NonEmptyString } from "../../../shared";
import bcrypt from "bcrypt";
import { InvalidPassword } from "./_errors/invalidPassword";

export class Password extends NonEmptyString<"Password"> {
  private static REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(hashedPassword: string) {
    super(hashedPassword, "Password");
  }

  static async create(plainTextPassword: string): Promise<Password> {
    if (!Password.REGEX.test(plainTextPassword)) {
      throw new InvalidPassword();
    }

    return new Password(await bcrypt.hash(plainTextPassword, salt));
  }

  async compare(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.toString());
  }
}
