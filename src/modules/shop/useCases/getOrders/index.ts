import { orderRepo } from "../../repos";
import { GetOrders } from "./getOrders";

const getOrders = new GetOrders(orderRepo);

export { getOrders };
