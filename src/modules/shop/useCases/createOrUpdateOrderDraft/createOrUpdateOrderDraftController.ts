import * as express from "express";
import { BaseController, Error, TextUtils } from "../../../../shared";
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
        info: req.body.info
          ? {
              city: TextUtils.sanitize(req.body.info.city ?? ""),
              administrativeArea: TextUtils.sanitize(
                req.body.info.administrativeArea ?? ""
              ),
              country: TextUtils.sanitize(req.body.info.country ?? ""),
              dependentLocality: TextUtils.sanitize(
                req.body.info.dependentLocality ?? ""
              ),
              details: TextUtils.sanitize(req.body.info.details ?? ""),
              email: TextUtils.sanitize(req.body.info.email ?? ""),
              firstName: TextUtils.sanitize(req.body.info.firstName ?? ""),
              lastName: TextUtils.sanitize(req.body.info.lastName ?? ""),
              postalCode: TextUtils.sanitize(req.body.info.postalCode ?? ""),
              province: TextUtils.sanitize(req.body.info.province ?? ""),
              streetName: TextUtils.sanitize(req.body.info.streetName ?? ""),
              streetName2: TextUtils.sanitize(req.body.info.streetName2 ?? ""),
            }
          : undefined,
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
