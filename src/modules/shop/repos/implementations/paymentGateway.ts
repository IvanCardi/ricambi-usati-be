import { PaymentStatus } from "../../domain/payment/paymentStatus";
import { mollie } from "../../infra/mollie/molliePaymentGateway";
import { PaymentError } from "../../domain/_errors/payment";
import { IPaymentGateway } from "../paymentGateway";
import { urls } from "../../../../config";

export class PaymentGateway implements IPaymentGateway {
  async createPayment(amount: number, orderId: string): Promise<string> {
    const payment = await mollie.payments.create({
      amount: {
        value: amount.toFixed(2),
        currency: "EUR",
      },
      description: `Order #${orderId}`,
      metadata: { orderId },
      redirectUrl: `${urls.fe}/processingPayment?orderId=${orderId}`,
      webhookUrl: `${urls.be}/webhook`,
    });

    const checkoutPaymentUrl = payment.getCheckoutUrl();

    if (!checkoutPaymentUrl) {
      throw new PaymentError.CheckoutUrlCreationFailed();
    }

    return checkoutPaymentUrl;
  }

  async getPaymentStatus(
    id: string
  ): Promise<{ orderId: string; status: PaymentStatus }> {
    const payment = await mollie.payments.get(id);

    const orderId = (payment.metadata as any)?.orderId as string;

    if (payment.status === "open") {
      return { orderId, status: "pending" };
    }

    return { orderId, status: payment.status };
  }
}
