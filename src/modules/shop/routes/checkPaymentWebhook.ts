import express from "express";
import { CheckPaymentStatusWebhookController } from "../useCases/checkPaymentStatusWebhook/checkPaymentStatusWebhookController";
import { checkPaymentStatusWebhook } from "../useCases/checkPaymentStatusWebhook";

const checkPaymentWebhookRouter = express.Router();

checkPaymentWebhookRouter.post("/webhook", (req, res) =>
  new CheckPaymentStatusWebhookController(checkPaymentStatusWebhook).execute(
    req,
    res
  )
);

export default checkPaymentWebhookRouter;
