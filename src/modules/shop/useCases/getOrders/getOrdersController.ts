import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetOrders } from "./getOrders";

export class GetOrdersController extends BaseController {
  private getOrders: GetOrders;

  public constructor(getOrders: GetOrders) {
    super();
    this.getOrders = getOrders;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const orders = await this.getOrders.execute();

      return this.ok(res, orders);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
