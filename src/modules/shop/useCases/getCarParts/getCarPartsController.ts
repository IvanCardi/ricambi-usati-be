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
        userId: req.body.userId,
        carId:
          req.query.carId === "undefined"
            ? undefined
            : (req.query.carId as string),
        page: req.query.page ? parseFloat(req.query.page as string) : undefined,
        brand: req.query.brand ? (req.query.brand as string) : undefined,
        model: req.query.model ? (req.query.model as string) : undefined,
        setup: req.query.setup ? (req.query.setup as string) : undefined,
        startYear: req.query.startYear
          ? parseFloat(req.query.startYear as string)
          : undefined,
        endYear: req.query.endYear
          ? parseFloat(req.query.endYear as string)
          : undefined,
        order: req.query.order ? (req.query.order as OrderBy) : undefined,
        number: req.query.number ? (req.query.number as OrderBy) : undefined,
        category: req.query.category
          ? (req.query.category as string)
          : undefined,
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
