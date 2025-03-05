import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import {
  UpdateCompanyDiscount,
  UpdateCompanyDiscountInput,
} from "./updateCompanyDiscount";

export class UpdateCompanyDiscountController extends BaseController {
  private updateCompanyDiscount: UpdateCompanyDiscount;

  public constructor(updateCompanyDiscount: UpdateCompanyDiscount) {
    super();
    this.updateCompanyDiscount = updateCompanyDiscount;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: UpdateCompanyDiscountInput = {
        customerId: req.params.id,
        discount: req.body.discount,
      };

      await this.updateCompanyDiscount.execute(input);

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
