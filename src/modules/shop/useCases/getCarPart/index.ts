import { carPartRepo } from "../../repos";
import { GetCarPart } from "./getCarPart";

const getCarPart = new GetCarPart(carPartRepo);

export { getCarPart };
