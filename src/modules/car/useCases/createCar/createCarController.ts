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
      const car = await this.createCar.execute(req.body);

      return this.ok(res, { id: car.id });
    } catch (error) {
      return this.fail(res, error instanceof Error ? error.code : error);
    }
  }
}
