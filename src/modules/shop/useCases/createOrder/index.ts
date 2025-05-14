import {
  carPartRepo,
  orderDraftRepo,
  orderRepo,
  paymentService
} from "../../repos";
import { CreateOrder } from "./createOrder";

const createOrder = new CreateOrder(
  orderDraftRepo,
  carPartRepo,
  orderRepo,
  paymentService
);

export { createOrder };
