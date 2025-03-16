import { carPartRepo, customerRepo, orderRepo } from "../../repos";
import { CreateOrder } from "./createOrder";

const createOrder = new CreateOrder(orderRepo, customerRepo, carPartRepo);

export { createOrder };
