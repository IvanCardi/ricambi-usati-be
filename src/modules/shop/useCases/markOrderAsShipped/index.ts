import { orderRepo } from "../../repos";
import { MarkOrderAsShipped } from "./markOrderAsShipped";

const markOrderAsShipped = new MarkOrderAsShipped(orderRepo);

export { markOrderAsShipped };
