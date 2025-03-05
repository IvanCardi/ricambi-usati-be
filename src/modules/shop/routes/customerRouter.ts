import express from "express";
import { createCustomer } from "../useCases/createCustomer";
import { CreateCustomerController } from "../useCases/createCustomer/createCustomerController";

const customerRouter = express.Router();

customerRouter.post("/customers", (req, res) =>
  new CreateCustomerController(createCustomer).execute(req, res)
);

export default customerRouter;
