import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCarPart, GetCarPartInput } from "./getCarPart";
import { carPartMap } from "../../mappers";

export class GetCarPartController extends BaseController {
  private getCarPart: GetCarPart;

  public constructor(getCarPart: GetCarPart) {
    super();
    this.getCarPart = getCarPart;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: GetCarPartInput = {
        id: req.params.id,
        userId: req.body.userId,
      };

      const carPart = await this.getCarPart.execute(input);

      return this.ok(res, carPart);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
