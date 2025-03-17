import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetOrder } from "./getOrder";

export class GetOrderController extends BaseController {
  private getOrder: GetOrder;

  public constructor(getOrder: GetOrder) {
    super();
    this.getOrder = getOrder;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const order = await this.getOrder.execute({ id: req.params.id });

      return this.ok(res, order);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
