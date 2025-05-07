import { Payment } from "../domain/payment/payment";
import { PaymentStatus } from "../domain/payment/paymentStatus";

export interface IPaymentGateway {
  createPayment(amount: number, orderId: string): Promise<Payment>;
  getPaymentStatus(id: string): Promise<PaymentStatus>;
}
