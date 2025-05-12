import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetOrderDraft, GetOrderDraftInput } from "./getOrderDraft";

export class GetOrderDraftController extends BaseController {
  private getOrderDraft: GetOrderDraft;

  public constructor(getOrderDraft: GetOrderDraft) {
    super();
    this.getOrderDraft = getOrderDraft;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const input: GetOrderDraftInput = {
        orderId: req.params.id,
        userId: req.body.userId,
      };

      const orderDraft = await this.getOrderDraft.execute(input);

      return this.ok(res, orderDraft);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
