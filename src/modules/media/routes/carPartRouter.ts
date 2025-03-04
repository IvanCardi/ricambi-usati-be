import express from "express";
import { UploadImagesController } from "../useCases/uploadImages/uploadImagesController";
import { uploadImages } from "../useCases/uploadImages";

const mediaRouter = express.Router();

mediaRouter.post("/images", (req, res) =>
  new UploadImagesController(uploadImages).execute(req, res)
);

export default mediaRouter;
