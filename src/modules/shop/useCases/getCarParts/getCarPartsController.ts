import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCarParts, GetCarPartsInput } from "./getCarParts";

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
        userId: req.body.userId,
        carId:
          req.query.carId === "undefined"
            ? undefined
            : (req.query.carId as string),
        page: req.query.page ? parseFloat(req.query.page as string) : 1,
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
