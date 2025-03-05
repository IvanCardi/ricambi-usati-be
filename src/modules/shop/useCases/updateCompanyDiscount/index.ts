import { customerRepo } from "../../repos";
import { UpdateCompanyDiscount } from "./updateCompanyDiscount";

const updateCompanyDiscount = new UpdateCompanyDiscount(customerRepo);

export { updateCompanyDiscount };
