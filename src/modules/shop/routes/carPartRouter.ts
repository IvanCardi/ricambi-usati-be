import express from "express";
import { createCarParts } from "../useCases/createCarParts";
import { CreateCarPartsController } from "../useCases/createCarParts/createCarPartsController";
import { getCarParts } from "../useCases/getCarParts";
import { GetCarPartsController } from "../useCases/getCarParts/getCarPartsController";

const carPartRouter = express.Router();

carPartRouter.get("/carParts", (req, res) =>
  new GetCarPartsController(getCarParts).execute(req, res)
);

carPartRouter.post("/carParts", (req, res) =>
  new CreateCarPartsController(createCarParts).execute(req, res)
);

export default carPartRouter;
