import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { OrderDraft } from "../../domain/orderDraft/orderDraft";
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

      const orderDraftOrSoldProduct =
        await this.createOrUpdateOrderDraft.execute(input);

      if (orderDraftOrSoldProduct instanceof OrderDraft) {
        return this.ok(res, { id: orderDraftOrSoldProduct.id });
      } else {
        return this.clientError(
          res,
          "UnavailableProducts",
          orderDraftOrSoldProduct
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
