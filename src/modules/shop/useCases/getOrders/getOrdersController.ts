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

      return this.ok(
        res,
        orders.map((o) => ({
          id: o.id,
          status: o.status,
          totalPrice: o.productsAmount,
          createdAt: o.createdAt.toISOString(),
          address: {
            streetName: o.info.address.streetName,
            streetName2: o.info.address.streetName2,
            city: o.info.address.city,
            country: o.info.address.country,
            province: o.info.address.province,
            administrativeArea: o.info.address.administrativeArea,
            dependentLocality: o.info.address.dependentLocality,
            postalCode: o.info.address.postalCode,
            email: o.info.email,
            details: o.info.details,
          },
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
