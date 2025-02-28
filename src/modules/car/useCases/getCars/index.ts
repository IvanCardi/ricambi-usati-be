import { carRepo } from "../../repos";
import { GetCars } from "./getCars";

const getCars = new GetCars(carRepo);

export { getCars };
