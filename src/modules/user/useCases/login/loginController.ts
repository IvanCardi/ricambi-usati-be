import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
import { Login, LoginInput } from "./login";
import { access, isProduction, refresh } from "../../../../config";

export class LoginController extends BaseController {
  private login: Login;

  public constructor(login: Login) {
    super();
    this.login = login;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: LoginInput = {
        email: req.body.email ? TextUtils.sanitize(req.body.email) : "",
        password: req.body.password
          ? TextUtils.sanitize(req.body.password)
          : "",
      };

      const { accessToken, refreshToken } = await this.login.execute(input);

      /*   res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        path: "/",
        maxAge: access.expiresIn * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        path: "/",
        maxAge: refresh.expiresIn * 1000,
      }); */

      return this.ok(res, { accessToken, refreshToken });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
