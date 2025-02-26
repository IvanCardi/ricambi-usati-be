import express from "express";
import { CreateCarPartsController } from "../useCases/createCarParts/createCarPartsController";
import { createCarParts } from "../useCases/createCarParts";

const carPartRouter = express.Router();

carPartRouter.post("/carParts", (req, res) =>
  new CreateCarPartsController(createCarParts).execute(req, res)
);

export default carPartRouter;
