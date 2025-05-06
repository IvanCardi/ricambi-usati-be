import { Entity } from "../../../../shared";
import { PaymentStatus } from "./paymentStatus";

export type PaymentProps = {
  status: PaymentStatus;
  checkoutUrl: string;
};

export class Payment extends Entity<PaymentProps> {
  constructor(props: PaymentProps, id?: string) {
    super(props, id);
  }

  get status() {
    return this.props.status;
  }

  get checkoutUrl() {
    return this.props.checkoutUrl;
  }
}
