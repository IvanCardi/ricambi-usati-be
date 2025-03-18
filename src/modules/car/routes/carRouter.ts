import express from "express";
import { createCar } from "../useCases/createCar";
import { CreateCarController } from "../useCases/createCar/createCarController";
import { GetCarsController } from "../useCases/getCars/getCarsController";
import { getCars } from "../useCases/getCars";
import { GetCarController } from "../useCases/getCar/getCarController";
import { getCar } from "../useCases/getCar";

const carRouter = express.Router();

carRouter.get("/cars", (req, res) =>
  new GetCarsController(getCars).execute(req, res)
);

carRouter.post("/cars", (req, res) =>
  new CreateCarController(createCar).execute(req, res)
);

carRouter.get("/cars/:id", (req, res) =>
  new GetCarController(getCar).execute(req, res)
);

export default carRouter;
