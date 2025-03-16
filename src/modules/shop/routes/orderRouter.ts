import express from "express";
import { createOrder } from "../useCases/createOrder";
import { CreateOrderController } from "../useCases/createOrder/createOrderController";
import { GetOrdersController } from "../useCases/getOrders/getOrdersController";
import { getOrders } from "../useCases/getOrders";

const orderRouter = express.Router();

orderRouter.post("/orders", (req, res) =>
  new CreateOrderController(createOrder).execute(req, res)
);

orderRouter.get("/orders", (req, res) =>
  new GetOrdersController(getOrders).execute(req, res)
);

export default orderRouter;
