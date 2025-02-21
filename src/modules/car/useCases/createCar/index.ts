import { brandModelSetupRepo, carRepo } from "../../repos";
import { CreateCar } from "./createCar";

const createCar = new CreateCar(carRepo, brandModelSetupRepo);

export { createCar };
