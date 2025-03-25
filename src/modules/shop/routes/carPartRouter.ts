import express from "express";
import { createCarParts } from "../useCases/createCarParts";
import { CreateCarPartsController } from "../useCases/createCarParts/createCarPartsController";
import { getCarParts } from "../useCases/getCarParts";
import { GetCarPartsController } from "../useCases/getCarParts/getCarPartsController";
import { GetCarPartController } from "../useCases/getCarPart/getCarPartController";
import { getCarPart } from "../useCases/getCarPart";
import { UpdateCarPartController } from "../useCases/updateCarPart/updateCarPartController";
import { updateCarPart } from "../useCases/updateCarPart";
import { DeleteCarPartController } from "../useCases/deleteCarPart/deleteCarPartController";
import { deleteCarPart } from "../useCases/deleteCarPart";
import { authentication } from "../../../middelwares/authentication";

const carPartRouter = express.Router();

carPartRouter.get("/carParts", authentication, (req, res) =>
  new GetCarPartsController(getCarParts).execute(req, res)
);

carPartRouter.post("/carParts", (req, res) =>
  new CreateCarPartsController(createCarParts).execute(req, res)
);

carPartRouter.get("/carParts/:id", (req, res) =>
  new GetCarPartController(getCarPart).execute(req, res)
);

carPartRouter.patch("/carParts/:id", (req, res) =>
  new UpdateCarPartController(updateCarPart).execute(req, res)
);

carPartRouter.delete("/carParts/:id", (req, res) =>
  new DeleteCarPartController(deleteCarPart).execute(req, res)
);

export default carPartRouter;
