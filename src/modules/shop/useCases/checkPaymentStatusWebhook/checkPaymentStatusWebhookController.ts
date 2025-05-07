import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CheckPaymentStatusWebhook } from "./checkPaymentStatusWebhook";

export class CheckPaymentStatusWebhookController extends BaseController {
  private checkPaymentStatusWebhook: CheckPaymentStatusWebhook;

  public constructor(checkPaymentStatusWebhook: CheckPaymentStatusWebhook) {
    super();
    this.checkPaymentStatusWebhook = checkPaymentStatusWebhook;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      await this.checkPaymentStatusWebhook.execute(req.body);

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
