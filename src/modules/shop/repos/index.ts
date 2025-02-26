import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo();

export { carRepo, carPartRepo };
