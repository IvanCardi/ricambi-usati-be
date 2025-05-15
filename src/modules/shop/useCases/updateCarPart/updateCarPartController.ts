import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
import { UpdateCarPart, UpdateCarPartInput } from "./updateCarPart";

export class UpdateCarPartController extends BaseController {
  private updateCarPart: UpdateCarPart;

  public constructor(updateCarPart: UpdateCarPart) {
    super();
    this.updateCarPart = updateCarPart;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: UpdateCarPartInput = {
        id: req.params.id,
        name: req.body.name ? TextUtils.sanitize(req.body.name) : "",
        numbers: req.body.numbers
          ? req.body.numbers.map((n: string) => TextUtils.sanitize(n))
          : [],
        category: req.body.category
          ? TextUtils.sanitize(req.body.category)
          : "",
        description: req.body.description
          ? TextUtils.sanitize(req.body.description)
          : "",
        photos: req.body.photos
          ? req.body.photos.map((p: string) => TextUtils.sanitize(p))
          : [],
        compatibleCars: req.body.compatibleCars
          ? req.body.compatibleCars.map((c: string) => TextUtils.sanitize(c))
          : [],
        warranty: req.body.warranty, // in month
        price: req.body.price,
        adHocShippingCosts: req.body.adHocShippingCosts,
        technicalDetails: req.body.technicalDetails.map((td: any) => ({
          label: TextUtils.sanitize(td.label),
          value: TextUtils.sanitize(td.value),
        })),
      };

      await this.updateCarPart.execute(input);

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
