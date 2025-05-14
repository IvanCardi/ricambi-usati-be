import { orderRepo } from "../../repos";
import { CheckOrderStatus } from "./checkOrderStatus";

const checkOrderStatus = new CheckOrderStatus(orderRepo);

export { checkOrderStatus };
