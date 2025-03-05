import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { GetCustomers } from "./getCustomers";
import { customerMap } from "../../mappers";

export class GetCustomersController extends BaseController {
  private getCustomers: GetCustomers;

  public constructor(getCustomers: GetCustomers) {
    super();
    this.getCustomers = getCustomers;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const customers = await this.getCustomers.execute();

      return this.ok(res, customers.map(customerMap.toDTO));
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
