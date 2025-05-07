import { orderRepo, paymentService } from "../../repos";
import { CheckPaymentStatusWebhook } from "./checkPaymentStatusWebhook";

const checkPaymentStatusWebhook = new CheckPaymentStatusWebhook(
  paymentService,
  orderRepo
);

export { checkPaymentStatusWebhook };
