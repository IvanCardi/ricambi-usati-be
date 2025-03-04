import * as express from "express";
import { BaseController, Error } from "../../../../shared";
import { UploadImages, UploadImagesInput } from "./uploadImages";
import { UploadedFile } from "express-fileupload";

export class UploadImagesController extends BaseController {
  private uploadImages: UploadImages;

  public constructor(uploadImages: UploadImages) {
    super();
    this.uploadImages = uploadImages;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const input: UploadImagesInput = {
        images: (req.files?.photos as UploadedFile[]).map((f) => ({
          name: f.name,
          data: f.data,
        })),
      };

      const paths = await this.uploadImages.execute(input);

      return this.ok(res, { paths });
    } catch (error) {
      if (error instanceof Error) {
        return this.clientError(res, error.message);
      }

      return this.fail(res, error as any);
    }
  }
}
