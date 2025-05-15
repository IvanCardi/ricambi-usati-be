import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
import { CreateCarParts, CreateCarPartsInput } from "./createCarParts";
import { PaymentError } from "../../domain/_errors/payment";

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
          adHocShippingCosts: p.adHocShippingCosts,
          technicalDetails: p.technicalDetails.map((td: any) => ({
            label: TextUtils.sanitize(td.label),
            value: TextUtils.sanitize(td.value),
          })),
        })),
      };

      await this.createCarParts.execute(input);

      return this.created(res);
    } catch (error) {
      if (error instanceof PaymentError.CheckoutUrlCreationFailed) {
        return this.clientError(res, error.code);
      }

      return this.fail(res, error as any);
    }
  }
}
