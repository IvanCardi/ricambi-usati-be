import { carPartRepo, customerRepo } from "../../repos";
import { GetCarParts } from "./getCarParts";

const getCarParts = new GetCarParts(carPartRepo, customerRepo);

export { getCarParts };
