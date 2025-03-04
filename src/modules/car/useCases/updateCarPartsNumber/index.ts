import { carRepo } from "../../repos";
import { UpdateCarPartsNumber } from "./updateCarPartsNumber";

const updateCarPartsNumber = new UpdateCarPartsNumber(carRepo);

export { updateCarPartsNumber };
