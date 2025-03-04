import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCarParts } from "./getCarParts";
import { carPartMap } from "../../mappers";

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
      const carParts = await this.getCarParts.execute();

      return this.ok(
        res,
        carParts.map((c) => carPartMap.toDTO(c))
      );
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
