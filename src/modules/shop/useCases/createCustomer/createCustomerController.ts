import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { CreateCustomer, CreateCustomerInput } from "./createCustomer";

export class CreateCustomerController extends BaseController {
  private createCustomer: CreateCustomer;

  public constructor(createCustomer: CreateCustomer) {
    super();
    this.createCustomer = createCustomer;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: CreateCustomerInput = req.body;

      await this.createCustomer.execute(input);

      return this.created(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }
      return this.fail(res, error as any);
    }
  }
}
