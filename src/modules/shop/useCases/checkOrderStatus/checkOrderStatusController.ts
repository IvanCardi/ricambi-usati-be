import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CheckOrderStatus, CheckOrderStatusInput } from "./checkOrderStatus";

export class CheckOrderStatusController extends BaseController {
  private checkOrderStatus: CheckOrderStatus;

  public constructor(checkOrderStatus: CheckOrderStatus) {
    super();
    this.checkOrderStatus = checkOrderStatus;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const input: CheckOrderStatusInput = {
        orderId: req.params.id,
      };

      const status = await this.checkOrderStatus.execute(input);

      return this.ok(res, { status });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
