import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";
import { CustomerRepo } from "./implementations/customerRepo";
import { OrderRepo } from "./implementations/orderRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo(carRepo);
const customerRepo = new CustomerRepo();
const orderRepo = new OrderRepo();

export { carRepo, carPartRepo, customerRepo, orderRepo };
