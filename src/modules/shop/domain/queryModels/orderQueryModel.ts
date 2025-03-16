import { OrderStatus } from "../order/orderStatus";

export type OrderQueryModel = {
  id: string;
  user:
    | {
        id: string;
        type: "private";
        firstName: string;
        lastName: string;
      }
    | { id: string; type: "company"; name: string };
  address: {
    street: string;
    number: string;
    zipCode: string;
    province: string;
    city: string;
    state: string;
  };
  products: {
    id: string;
    name: string;
    photo: string;
    description: string;
  }[];
  status: OrderStatus;
  totalPrice: number;
};
