import express from "express";
import { authentication } from "../../../middelwares/authentication";
import { checkCarPartsAvailability } from "../useCases/checkCarPartsAvailability";
import { CheckCarPartsAvailabilityController } from "../useCases/checkCarPartsAvailability/checkCarPartsAvailabilityController";
import { createCarParts } from "../useCases/createCarParts";
import { CreateCarPartsController } from "../useCases/createCarParts/createCarPartsController";
import { deleteCarPart } from "../useCases/deleteCarPart";
import { DeleteCarPartController } from "../useCases/deleteCarPart/deleteCarPartController";
import { getCarPart } from "../useCases/getCarPart";
import { GetCarPartController } from "../useCases/getCarPart/getCarPartController";
import { getCarParts } from "../useCases/getCarParts";
import { GetCarPartsController } from "../useCases/getCarParts/getCarPartsController";
import { getFilteredCarParts } from "../useCases/getFilteredCarParts";
import { GetFilteredCarPartsController } from "../useCases/getFilteredCarParts/getFilteredCarPartsController";
import { updateCarPart } from "../useCases/updateCarPart";
import { UpdateCarPartController } from "../useCases/updateCarPart/updateCarPartController";

const carPartRouter = express.Router();

carPartRouter.get("/carParts", authentication, (req, res) =>
  new GetCarPartsController(getCarParts).execute(req, res)
);

carPartRouter.post("/carParts", (req, res) =>
  new CreateCarPartsController(createCarParts).execute(req, res)
);

carPartRouter.get("/carParts/filtered", authentication, (req, res) =>
  new GetFilteredCarPartsController(getFilteredCarParts).execute(req, res)
);

carPartRouter.get("/carParts/availability", authentication, (req, res) =>
  new CheckCarPartsAvailabilityController(checkCarPartsAvailability).execute(
    req,
    res
  )
);

carPartRouter.get("/carParts/:id", authentication, (req, res) =>
  new GetCarPartController(getCarPart).execute(req, res)
);

carPartRouter.patch("/carParts/:id", (req, res) =>
  new UpdateCarPartController(updateCarPart).execute(req, res)
);

carPartRouter.delete("/carParts/:id", (req, res) =>
  new DeleteCarPartController(deleteCarPart).execute(req, res)
);

export default carPartRouter;
