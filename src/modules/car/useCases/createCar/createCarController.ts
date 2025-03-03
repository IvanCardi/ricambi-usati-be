import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CreateCar } from "./createCar";

export class CreateCarController extends BaseController {
  private createCar: CreateCar;

  public constructor(createCar: CreateCar) {
    super();
    this.createCar = createCar;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      await this.createCar.execute(req.body);

      return this.created(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.code);
      }

      return this.fail(res, error as any);
    }
  }
}
