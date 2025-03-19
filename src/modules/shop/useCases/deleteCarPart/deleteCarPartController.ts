import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { DeleteCarPart } from "./deleteCarPart";

export class DeleteCarPartController extends BaseController {
  private deleteCarPart: DeleteCarPart;

  public constructor(deleteCarPart: DeleteCarPart) {
    super();
    this.deleteCarPart = deleteCarPart;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      await this.deleteCarPart.execute({ id: req.params.id });

      return this.ok(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
