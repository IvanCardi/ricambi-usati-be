import { PaymentStatus } from "../domain/payment/paymentStatus";

export interface IPaymentGateway {
  createPayment(amount: number, orderId: string): Promise<string>;
  getPaymentStatus(
    id: string
  ): Promise<{ orderId: string; status: PaymentStatus }>;
}
