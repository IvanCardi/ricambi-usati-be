import { UseCase } from "../../../../shared";
import { IMediaRepo } from "../../repos/mediaRepo";

export type UploadImagesInput = {
  images: { name: string; data: Buffer }[];
};

export class UploadImages implements UseCase<UploadImagesInput, string[]> {
  constructor(private mediaRepo: IMediaRepo) {}

  async execute(input: UploadImagesInput): Promise<string[]> {
    const paths = await this.mediaRepo.uploadImages(input.images);

    return paths;
  }
}
