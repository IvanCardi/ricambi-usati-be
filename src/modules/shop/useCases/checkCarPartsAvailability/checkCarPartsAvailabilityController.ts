import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import {
  CheckCarPartsAvailability,
  CheckCarPartsAvailabilityInput,
} from "./checkCarPartsAvailability";

export class CheckCarPartsAvailabilityController extends BaseController {
  private checkCarPartsAvailability: CheckCarPartsAvailability;

  public constructor(checkCarPartsAvailability: CheckCarPartsAvailability) {
    super();
    this.checkCarPartsAvailability = checkCarPartsAvailability;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const products = req.query.products;
      
      const input: CheckCarPartsAvailabilityInput = {
        products:
          typeof products === "string" ? [products] : (products as string[]),
      };

      const soldProducts = await this.checkCarPartsAvailability.execute(input);

      return this.ok(res, { soldProducts });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
