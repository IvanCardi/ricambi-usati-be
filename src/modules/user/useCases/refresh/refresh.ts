import { access, refresh } from "../../../../config";
import { Error, UseCase } from "../../../../shared";
import jwt from "jsonwebtoken";
import { RefreshTokenExpired } from "../_errors/refreshTokenExpired";

export type RefreshInput = {
  refreshToken: string;
};

export class Refresh implements UseCase<RefreshInput, string | undefined> {
  async execute({ refreshToken }: RefreshInput): Promise<string | undefined> {
    try {
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
    } catch (error) {
      throw new RefreshTokenExpired();
    }
  }
}
