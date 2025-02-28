import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCars } from "./getCars";
import { carMap } from "../../mappers";

export class GetCarsController extends BaseController {
  private getCars: GetCars;

  public constructor(getCars: GetCars) {
    super();
    this.getCars = getCars;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const cars = await this.getCars.execute();

      return this.ok(
        res,
        cars.map((c) => carMap.toDTO(c))
      );
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
