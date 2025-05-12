import { PaymentStatus } from "../../domain/payment/paymentStatus";
import { mollie } from "../../infra/mollie/molliePaymentGateway";
import { PaymentError } from "../../domain/_errors/payment";
import { IPaymentGateway } from "../paymentGateway";

export class PaymentGateway implements IPaymentGateway {
  async createPayment(
    amount: number,
    orderId: string
  ): Promise<{ checkoutPaymentUrl: string; paymentId: string }> {
    const payment = await mollie.payments.create({
      amount: {
        value: amount.toFixed(2),
        currency: "EUR",
      },
      description: `Order #${orderId}`,
      metadata: { orderId },
      redirectUrl: `${process.env.FE_BASE_URL}/processingPayment`,
      webhookUrl: `${process.env.BE_BASE_URL}/webhook`,
    });

    const checkoutPaymentUrl = payment.getCheckoutUrl();

    if (!checkoutPaymentUrl) {
      throw new PaymentError.CheckoutUrlCreationFailed();
    }

    return {
      checkoutPaymentUrl,
      paymentId: payment.id,
    };
  }

  async getPaymentStatus(id: string): Promise<PaymentStatus> {
    const payment = await mollie.payments.get(id);

    if (payment.status === "open") {
      return "pending";
    }

    return payment.status;
  }
}
