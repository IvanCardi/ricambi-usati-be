import express from "express";
import { createOrder } from "../useCases/createOrder";
import { CreateOrderController } from "../useCases/createOrder/createOrderController";

const orderRouter = express.Router();

orderRouter.post("/orders", (req, res) =>
  new CreateOrderController(createOrder).execute(req, res)
);

export default orderRouter;
