import { carPartRepo } from "../../repos";
import { DeleteCarPart } from "./deleteCarPart";

const deleteCarPart = new DeleteCarPart(carPartRepo);

export { deleteCarPart };
