import express from "express";
import { createOrder } from "../useCases/createOrder";
import { CreateOrderController } from "../useCases/createOrder/createOrderController";
import { GetOrdersController } from "../useCases/getOrders/getOrdersController";
import { getOrders } from "../useCases/getOrders";
import { GetOrderController } from "../useCases/getOrder/getOrderController";
import { getOrder } from "../useCases/getOrder";
import { MarkOrderAsShippedController } from "../useCases/markOrderAsShipped/markOrderAsShippedController";
import { markOrderAsShipped } from "../useCases/markOrderAsShipped";
import { CheckOrderStatusController } from "../useCases/checkOrderStatus/checkOrderStatusController";
import { checkOrderStatus } from "../useCases/checkOrderStatus";

const orderRouter = express.Router();

orderRouter.post("/orders", (req, res) =>
  new CreateOrderController(createOrder).execute(req, res)
);

orderRouter.get("/orders", (req, res) =>
  new GetOrdersController(getOrders).execute(req, res)
);

orderRouter.get("/orders/:id", (req, res) =>
  new GetOrderController(getOrder).execute(req, res)
);

orderRouter.get("/orders/:id/status", (req, res) =>
  new CheckOrderStatusController(checkOrderStatus).execute(req, res)
);

orderRouter.patch("/orders/:id/shipped", (req, res) =>
  new MarkOrderAsShippedController(markOrderAsShipped).execute(req, res)
);

export default orderRouter;
