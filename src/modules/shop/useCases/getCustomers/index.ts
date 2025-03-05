import { customerRepo } from "../../repos";
import { GetCustomers } from "./getCustomers";

const getCustomers = new GetCustomers(customerRepo);

export { getCustomers };
