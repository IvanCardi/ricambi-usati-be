import { carPartRepo, customerRepo, orderRepo } from "../../repos";
import { GetOrders } from "./getOrders";

const getOrders = new GetOrders(orderRepo, carPartRepo, customerRepo);

export { getOrders };
