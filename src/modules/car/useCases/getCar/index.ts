import { carRepo } from "../../repos";
import { GetCar } from "./getCar";

const getCar = new GetCar(carRepo);

export { getCar };
