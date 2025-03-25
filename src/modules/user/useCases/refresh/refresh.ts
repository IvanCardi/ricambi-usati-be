import { access, refresh } from "../../../../config";
import { UseCase } from "../../../../shared";
import jwt from "jsonwebtoken";

export type RefreshInput = {
  refreshToken: string;
};

export class Refresh implements UseCase<RefreshInput, string> {
  async execute({ refreshToken }: RefreshInput): Promise<string> {
    const payload = jwt.verify(refreshToken, refresh.secret) as {
      userId: string;
      email: string;
    };
    const newAccessToken = jwt.sign(
      { email: payload.email, userId: payload.userId },
      access.secret,
      {
        expiresIn: access.expiresIn,
      }
    );

    return newAccessToken;
  }
}
