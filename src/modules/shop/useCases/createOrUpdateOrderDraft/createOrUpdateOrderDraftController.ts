import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import {
  CreateOrUpdateOrderDraft,
  CreateOrUpdateOrderDraftInput,
} from "./createOrUpdateOrderDraft";

export class CreateOrUpdateOrderDraftController extends BaseController {
  private createOrUpdateOrderDraft: CreateOrUpdateOrderDraft;

  public constructor(createOrUpdateOrderDraft: CreateOrUpdateOrderDraft) {
    super();
    this.createOrUpdateOrderDraft = createOrUpdateOrderDraft;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const input: CreateOrUpdateOrderDraftInput = {
        products: req.body.products,
        orderId: req.body.orderId,
        userId: req.body.userId,
      };

      const orderDraft = await this.createOrUpdateOrderDraft.execute(input);

      return this.ok(res, { id: orderDraft.id });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
