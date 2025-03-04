import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo(carRepo);

export { carRepo, carPartRepo };
