import jwt from "jsonwebtoken";
import { access, refresh } from "../../../../config";
import { UseCase } from "../../../../shared";
import { IUserRepo } from "../../repos/userRepo";
import { InvalidCredentials } from "../_errors/invalidCredentials";

export type LoginInput = {
  email: string;
  password: string;
};

export class Login
  implements UseCase<LoginInput, { accessToken: string; refreshToken: string }>
{
  constructor(private userRepo: IUserRepo) {}

  async execute(
    input: LoginInput
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.getByEmail(input.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!user.hasSamePassword(input.password)) {
      throw new InvalidCredentials();
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      access.secret,
      {
        expiresIn: access.expiresIn,
      }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      refresh.secret,
      {
        expiresIn: refresh.expiresIn,
      }
    );

    return { accessToken, refreshToken };
  }
}
