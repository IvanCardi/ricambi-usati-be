import express from "express";
import { createCar } from "../useCases/createCar";
import { CreateCarController } from "../useCases/createCar/createCarController";
import { GetCarsController } from "../useCases/getCars/getCarsController";
import { getCars } from "../useCases/getCars";

const carRouter = express.Router();

carRouter.get("/cars", (req, res) =>
  new GetCarsController(getCars).execute(req, res)
);

carRouter.post("/cars", (req, res) =>
  new CreateCarController(createCar).execute(req, res)
);

export default carRouter;
