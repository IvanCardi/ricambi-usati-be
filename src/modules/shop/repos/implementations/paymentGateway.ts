import { Payment } from "../../domain/payment/payment";
import { PaymentStatus } from "../../domain/payment/paymentStatus";
import { mollie } from "../../infra/mollie/molliePaymentGateway";
import { IPaymentGateway } from "../paymentGateway";

export class PaymentGateway implements IPaymentGateway {
  async createPayment(amount: number, orderId: string): Promise<Payment> {
    const payment = await mollie.payments.create({
      amount: {
        value: amount.toString(),
        currency: "EUR",
      },
      description: `Order #${orderId}`,
      redirectUrl: process.env.FE_REDIRECT_URL,
      webhookUrl: `${process.env.BE_BASE_URL}/webhook`,
    });

    const checkoutUrl = payment.getCheckoutUrl();

    if (!checkoutUrl)
      return new Payment(
        {
          checkoutUrl: "",
          status: "failed",
        },
        orderId
      );

    return new Payment({ checkoutUrl, status: "pending" }, orderId);
  }

  async getPaymentStatus(id: string): Promise<PaymentStatus> {
    const payment = await mollie.payments.get(id);

    if (payment.status === "open") {
      return "pending";
    }

    return payment.status;
  }
}
