import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { Refresh, RefreshInput } from "./refresh";
import { access, isProduction } from "../../../../config";

export class RefreshController extends BaseController {
  private refresh: Refresh;

  public constructor(refresh: Refresh) {
    super();
    this.refresh = refresh;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: RefreshInput = {
        refreshToken: req.headers.authorization?.split(" ")[1] ?? "",
      };

      const accessToken = await this.refresh.execute(input);

      return this.ok(res, { accessToken });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
