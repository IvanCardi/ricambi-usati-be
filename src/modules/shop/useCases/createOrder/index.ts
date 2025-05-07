import {
  carPartRepo,
  customerRepo,
  orderRepo,
  paymentService,
} from "../../repos";
import { CreateOrder } from "./createOrder";

const createOrder = new CreateOrder(
  orderRepo,
  customerRepo,
  carPartRepo,
  paymentService
);

export { createOrder };
