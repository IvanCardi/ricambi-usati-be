import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CreateCarParts } from "./createCarParts";

export class CreateCarPartsController extends BaseController {
  private createCarParts: CreateCarParts;

  public constructor(createCarParts: CreateCarParts) {
    super();
    this.createCarParts = createCarParts;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      await this.createCarParts.execute(req.body);

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
