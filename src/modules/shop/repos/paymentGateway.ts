import { Payment } from "../domain/payment/payment";

export interface IPaymentGateway {
  createPayment(amount: number, orderId: string): Promise<Payment>;
}
