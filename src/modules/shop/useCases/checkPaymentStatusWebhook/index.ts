import { orderDraftRepo, orderRepo, paymentService } from "../../repos";
import { CheckPaymentStatusWebhook } from "./checkPaymentStatusWebhook";

const checkPaymentStatusWebhook = new CheckPaymentStatusWebhook(
  paymentService,
  orderRepo,
  orderDraftRepo
);

export { checkPaymentStatusWebhook };
