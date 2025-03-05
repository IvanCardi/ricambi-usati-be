import { customerRepo } from "../../repos";
import { CreateCustomer } from "./createCustomer";

const createCustomer = new CreateCustomer(customerRepo);

export { createCustomer };
