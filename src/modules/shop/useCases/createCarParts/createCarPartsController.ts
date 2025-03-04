import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
import { CreateCarParts, CreateCarPartsInput } from "./createCarParts";

export class CreateCarPartsController extends BaseController {
  private createCarParts: CreateCarParts;

  public constructor(createCarParts: CreateCarParts) {
    super();
    this.createCarParts = createCarParts;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const input: CreateCarPartsInput = {
        carId: req.body.carId,
        parts: req.body.parts.map((p: any) => ({
          name: !!p.name ? TextUtils.sanitize(p.name) : "",
          numbers: !!p.numbers
            ? p.numbers.map((n: string) => TextUtils.sanitize(n))
            : [],
          category: !!p.category ? TextUtils.sanitize(p.category) : "",
          description: !!p.description ? TextUtils.sanitize(p.description) : "",
          photos: !!p.photos
            ? p.photos.map((p: string) => TextUtils.sanitize(p))
            : [],
          compatibleCars: !!p.compatibleCars
            ? p.compatibleCars.map((c: string) => TextUtils.sanitize(c))
            : [],
          warranty: p.warranty, // in month
          price: p.price, // in €
        })),
      };

      await this.createCarParts.execute(input);

      return this.created(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
