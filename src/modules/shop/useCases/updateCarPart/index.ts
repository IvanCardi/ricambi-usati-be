import { carPartRepo } from "../../repos";
import { UpdateCarPart } from "./updateCarPart";

const updateCarPart = new UpdateCarPart(carPartRepo);

export { updateCarPart };
