import { PaymentStatus } from "../domain/payment/paymentStatus";

export interface IPaymentGateway {
  createPayment(
    amount: number,
    orderId: string
  ): Promise<{ checkoutPaymentUrl: string; paymentId: string }>;
  getPaymentStatus(id: string): Promise<PaymentStatus>;
}
