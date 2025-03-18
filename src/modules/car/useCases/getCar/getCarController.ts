import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCar, GetCarInput } from "./getCar";
import { carMap } from "../../mappers";

export class GetCarController extends BaseController {
  private getCar: GetCar;

  public constructor(getCar: GetCar) {
    super();
    this.getCar = getCar;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: GetCarInput = {
        id: req.params.id,
      };

      const car = await this.getCar.execute(input);

      return this.ok(res, carMap.toDTO(car));
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
