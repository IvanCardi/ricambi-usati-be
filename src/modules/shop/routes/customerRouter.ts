import express from "express";
import { createCustomer } from "../useCases/createCustomer";
import { CreateCustomerController } from "../useCases/createCustomer/createCustomerController";
import { getCustomers } from "../useCases/getCustomers";
import { GetCustomersController } from "../useCases/getCustomers/getCustomersController";

const customerRouter = express.Router();

customerRouter.get("/customers", (req, res) =>
  new GetCustomersController(getCustomers).execute(req, res)
);

customerRouter.post("/customers", (req, res) =>
  new CreateCustomerController(createCustomer).execute(req, res)
);

export default customerRouter;
