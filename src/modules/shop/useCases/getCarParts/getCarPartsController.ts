import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCarParts, GetCarPartsInput, OrderBy } from "./getCarParts";

export class GetCarPartsController extends BaseController {
  private getCarParts: GetCarParts;

  public constructor(getCarParts: GetCarParts) {
    super();
    this.getCarParts = getCarParts;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: GetCarPartsInput = {
        carId:
          req.query.carId === "undefined"
            ? undefined
            : (req.query.carId as string),
      };

      const carParts = await this.getCarParts.execute(input);

      return this.ok(res, carParts);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
