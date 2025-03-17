import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { MarkOrderAsShipped } from "./markOrderAsShipped";

export class MarkOrderAsShippedController extends BaseController {
  private markOrderAsShipped: MarkOrderAsShipped;

  public constructor(markOrderAsShipped: MarkOrderAsShipped) {
    super();
    this.markOrderAsShipped = markOrderAsShipped;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      await this.markOrderAsShipped.execute({ orderId: req.params.id });

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
