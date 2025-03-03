import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
import { CreateCar, CreateCarInput } from "./createCar";

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
      const input: CreateCarInput = {
        brand: !!req.body.brand ? TextUtils.sanitize(req.body.brand) : "",
        model: !!req.body.model ? TextUtils.sanitize(req.body.model) : "",
        setup: !!req.body.setup ? TextUtils.sanitize(req.body.setup) : "",
        description: !!req.body.description
          ? TextUtils.sanitize(req.body.description)
          : "",
        plate: !!req.body.plate ? TextUtils.sanitize(req.body.plate) : "",
        kilometers: req.body.kilometers,
        year: req.body.year,
      };

      await this.createCar.execute(input);

      return this.created(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.code);
      }

      return this.fail(res, error as any);
    }
  }
}
