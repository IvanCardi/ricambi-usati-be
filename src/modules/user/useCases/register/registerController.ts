import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { Register } from "./register";

export class RegisterController extends BaseController {
  private register: Register;

  public constructor(register: Register) {
    super();
    this.register = register;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      await this.register.execute(req.body);

      return this.created(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
