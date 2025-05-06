import { Payment } from "../../domain/payment/payment";
import { mollie } from "../../infra/mollie/molliePaymentGateway";
import { IPaymentGateway } from "../paymentGateway";

export class PaymentGateway implements IPaymentGateway {
  async createPayment(amount: number, orderId: string): Promise<Payment> {
    const payment = await mollie.payments.create({
      amount: {
        value: amount.toString(),
        currency: "EUR",
      },
      description: "My first API payment",
      redirectUrl: process.env.FE_REDIRECT_URL,
      webhookUrl: `${process.env.BE_BASE_URL}/webhook`,
    });

    const checkoutUrl = payment.getCheckoutUrl();

    if (!checkoutUrl)
      return new Payment({
        checkoutUrl: "",
        status: "failed",
      });

    return new Payment({ checkoutUrl, status: "in payment" });
  }
}
