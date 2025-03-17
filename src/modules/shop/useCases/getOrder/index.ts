import { orderRepo } from "../../repos";
import { GetOrder } from "./getOrder";

const getOrder = new GetOrder(orderRepo);

export { getOrder };
