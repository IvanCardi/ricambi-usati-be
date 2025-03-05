import express from "express";
import { createCustomer } from "../useCases/createCustomer";
import { CreateCustomerController } from "../useCases/createCustomer/createCustomerController";
import { getCustomers } from "../useCases/getCustomers";
import { GetCustomersController } from "../useCases/getCustomers/getCustomersController";
import { updateCompanyDiscount } from "../useCases/updateCompanyDiscount";
import { UpdateCompanyDiscountController } from "../useCases/updateCompanyDiscount/updateCompanyDiscountController";

const customerRouter = express.Router();

customerRouter.get("/customers", (req, res) =>
  new GetCustomersController(getCustomers).execute(req, res)
);

customerRouter.post("/customers", (req, res) =>
  new CreateCustomerController(createCustomer).execute(req, res)
);

customerRouter.patch("/customers/:id/discount", (req, res) =>
  new UpdateCompanyDiscountController(updateCompanyDiscount).execute(req, res)
);

export default customerRouter;
