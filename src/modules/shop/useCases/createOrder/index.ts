import { orderRepo } from "../../repos";
import { CreateOrder } from "./createOrder";

const createOrder = new CreateOrder(orderRepo);

export { createOrder };
