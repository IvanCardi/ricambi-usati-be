import { mediaRepo } from "../../repos";
import { UploadImages } from "./uploadImages";

const uploadImages = new UploadImages(mediaRepo);

export { uploadImages };
