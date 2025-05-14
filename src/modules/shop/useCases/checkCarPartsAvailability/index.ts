import { carPartRepo } from "../../repos";
import { CheckCarPartsAvailability } from "./checkCarPartsAvailability";

const checkCarPartsAvailability = new CheckCarPartsAvailability(carPartRepo);

export { checkCarPartsAvailability };
