import { carPartRepo } from "../../repos";
import { GetCarParts } from "./getCarParts";

const getCarParts = new GetCarParts(carPartRepo);

export { getCarParts };
