import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";
import { CustomerRepo } from "./implementations/customerRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo(carRepo);
const customerRepo = new CustomerRepo();

export { carRepo, carPartRepo, customerRepo };
