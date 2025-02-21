import express from "express";
import { CreateCarController } from "../useCases/createCar/createCarController";
import { createCar } from "../useCases/createCar";

const carRouter = express.Router();

carRouter.post("/cars", (req, res) =>
  new CreateCarController(createCar).execute(req, res)
);

export default carRouter;
