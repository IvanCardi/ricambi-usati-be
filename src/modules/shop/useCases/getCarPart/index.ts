import { carPartRepo, customerRepo } from "../../repos";
import { GetCarPart } from "./getCarPart";

const getCarPart = new GetCarPart(carPartRepo, customerRepo);

export { getCarPart };
