import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { IMediaRepo } from "../mediaRepo";
import { server } from "../../../../config";

export class LocalMediaRepo implements IMediaRepo {
  private static DIR_PATH = `public/media`;

  async uploadImages(
    images: { name: string; data: Buffer }[]
  ): Promise<string[]> {
    if (!existsSync(LocalMediaRepo.DIR_PATH)) {
      await mkdir(LocalMediaRepo.DIR_PATH, { recursive: true });
    }

    const paths = [];

    for (const { name, data } of images) {
      const sanitizedName = name.split(" ").join("_");
      const filePath = `${LocalMediaRepo.DIR_PATH}/${sanitizedName}`;

      await writeFile(filePath, data);

      paths.push(`http://localhost:${server.port}/${filePath}`);
    }

    return paths;
  }
}
