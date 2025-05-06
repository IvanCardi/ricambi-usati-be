import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CreateOrder } from "./createOrder";

export class CreateOrderController extends BaseController {
  private createOrder: CreateOrder;

  public constructor(createOrder: CreateOrder) {
    super();
    this.createOrder = createOrder;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const { checkoutPaymentUrl } = await this.createOrder.execute(req.body);

      return this.ok(res, checkoutPaymentUrl);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
