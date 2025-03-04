export interface IMediaRepo {
  uploadImages(images: { name: string; data: Buffer }[]): Promise<string[]>;
}
