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
          totalPrice: o.getTotalPrice(),
          createdAt: o.createdAt.toISOString(),
          address: {
            firstName: o.firstName,
            lastName: o.lastName,
            streetName: o.streetName,
            streetName2: o.streetName2,
            city: o.city,
            country: o.country,
            province: o.province,
            administrativeArea: o.administrativeArea,
            dependentLocality: o.dependentLocality,
            postalCode: o.postalCode,
            email: o.email,
            details: o.details,
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
