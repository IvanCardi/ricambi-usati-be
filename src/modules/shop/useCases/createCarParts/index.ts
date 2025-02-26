import { carPartRepo, carRepo } from "../../repos";
import { CreateCarParts } from "./createCarParts";

const createCarParts = new CreateCarParts(carRepo, carPartRepo);

export { createCarParts };
