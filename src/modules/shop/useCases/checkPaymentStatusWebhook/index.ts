import {
  carPartRepo,
  orderDraftRepo,
  orderRepo,
  paymentService,
} from "../../repos";
import { CheckPaymentStatusWebhook } from "./checkPaymentStatusWebhook";

const checkPaymentStatusWebhook = new CheckPaymentStatusWebhook(
  paymentService,
  orderRepo,
  orderDraftRepo,
  carPartRepo
);

export { checkPaymentStatusWebhook };
